import Cookies from "cookies";
import httpProxy from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";
import url from "url";
import { ACCESS_COOKIE_NAME, PROXY_PREFIX } from "../../../constants";
import env from "../../../environment";
import { setCookies } from "../../../helpers/auth";
import { AuthTokens } from "../../../interfaces";

// https://github.com/maximilianschmitt/next-auth

const proxy = httpProxy.createProxyServer({ autoRewrite: false });

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

    /*
      ⚠️⚠️⚠️ WARNING ⚠️⚠️⚠️
      WE HAVE VERY SPECIFIC PLACEMENT OF SLASHES THE API ACCEPTS
      NODE-HTTP-PROXY LIKES TO REWRITE SLASHES EVERYWHERE SO HERE WE HAVE SOME NOT SO FUN IFS
    */
    if (!req.url?.includes("?")) {
      // if there is no query param then add a trailling slash
      req.url = req.url?.replace(PROXY_PREFIX, "") + "/";
    } else {
      // if there is a query param then add a slash before the query param
      req.url = req.url?.replace(PROXY_PREFIX, "");
      const index = req.url.indexOf("?");
      req.url = req.url.slice(0, index) + "/" + req.url.slice(index);
    }

    if (isLogin || isRefresh) {
      proxy.once("proxyRes", interceptAuthResponses);
    }

    // handle errors & forward the request to the API
    proxy.once("error", reject).web(req, res, {
      target: env.api.baseUrl,
      changeOrigin: true,
      autoRewrite: false,
      selfHandleResponse: isLogin || isRefresh,
    });

    function interceptAuthResponses(proxyRes: any, req: any, res: any) {
      // read the response body from the stream
      let responseBody = "";
      proxyRes.on("data", (chunk: string) => {
        responseBody += chunk;
      });

      // once we've read the entire response, handle it
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
    }
  });
};
