import Cookies from "cookies";
import httpProxy from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";
import url from "url";
import { ACCESS_COOKIE_NAME, PROXY_PREFIX } from "../../../constants";
import env from "../../../environment";

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
    const isLogin = pathname?.includes("login/token");

    const cookies = new Cookies(req, res);
    const authToken = cookies.get(ACCESS_COOKIE_NAME);

    // rewrite the url & add a trailing slash to make django happy
    req.url = req.url?.replace(PROXY_PREFIX, "") + "/";

    console.log("PROXYURL", req.url);

    // don't forward any cookies to the api
    req.headers.cookie = "";

    if (authToken) {
      req.headers["Authorization"] = `Bearer ${authToken}`;
    }

    console.log("calling to domain", env.api.baseUrl + req.url);
    console.log("auth token", authToken);

    proxy
      .once(
        "proxyRes",
        //@ts-ignore
        (proxyRes, req: NextApiRequest, res: NextApiResponse) => {
          if (isLogin) {
            let responseBody = "";
            proxyRes.on("data", (chunk) => {
              responseBody += chunk;
            });

            proxyRes.on("end", () => {
              try {
                console.log("responseBody", responseBody);
                const {
                  access,
                  refresh,
                  refresh_expires,
                  access_expires,
                  detail,
                } = JSON.parse(responseBody);
                // detail is only returned on invalid credentials
                if (detail && !access) {
                  res.status(401).json({ reason: detail });
                  resolve(responseBody);
                } else {
                  const cookies = new Cookies(req, res);
                  const expires = new Date();
                  expires.setUTCSeconds(access_expires);
                  cookies.set("access", access, {
                    httpOnly: true,
                    sameSite: "lax",
                    expires,
                  });
                  const payload = {
                    authToken,
                    refresh,
                    refresh_expires,
                    access_expires,
                  };
                  console.log("PAYLOAD", payload);
                  res.status(200).json(payload);
                  resolve(payload);
                }
              } catch (e) {
                reject(e);
              }
            });
          } else {
            resolve(null);
          }
        }
      )
      .once("error", reject)
      .web(req, res, {
        target: env.api.baseUrl,
        autoRewrite: false,
        selfHandleResponse: isLogin,
      });
  });
};
