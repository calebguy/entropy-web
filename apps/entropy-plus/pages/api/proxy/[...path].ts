import Cookies from "cookies";
import httpProxy from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";
import url from "url";
import { ACCESS_COOKIE_NAME, PROXY_PREFIX } from "../../../constants";
import env from "../../../environment";
import { setCookies } from "../../../helpers/auth";
import { AuthTokens } from "../../../interfaces";

// https://github.com/maximilianschmitt/next-auth

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    const pathname = url.parse(req.url as string).pathname;
    const isLogin = pathname === PROXY_PREFIX + "/api/login/token";
    const isRefresh = pathname === PROXY_PREFIX + "/api/login/token/refresh";

    const cookies = new Cookies(req, res);
    const authToken = cookies.get(ACCESS_COOKIE_NAME);
    if (authToken) {
      req.headers["Authorization"] = `Bearer ${authToken}`;
    }

    // rewrite the url & add a trailing slash to make django happy
    req.url = req.url?.replace(PROXY_PREFIX, "") + "/";
    proxy
      .once("proxyRes", (proxyRes, req: any, res: any) => {
        if (isLogin || isRefresh) {
          let responseBody = "";
          proxyRes.on("data", (chunk) => {
            responseBody += chunk;
          });

          proxyRes.on("end", () => {
            try {
              const authData = JSON.parse(responseBody) as AuthTokens;
              const { detail, access } = authData;
              // detail is only returned on invalid credentials
              if (detail && !access) {
                res.status(401).json({ reason: detail });
                resolve(responseBody);
              } else {
                setCookies({
                  req,
                  res,
                  authData,
                });
                res.status(200).json(authData);
                resolve(authData);
              }
            } catch (e) {
              reject(e);
            }
          });
        } else {
          resolve(null);
        }
      })
      .once("error", reject)
      .web(req, res, {
        // secure: true,
        target: env.api.baseUrl,
        changeOrigin: true,
        autoRewrite: false,
        selfHandleResponse: isLogin || isRefresh,
      });
  });
};
