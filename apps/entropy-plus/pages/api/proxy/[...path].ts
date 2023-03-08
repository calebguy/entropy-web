import Cookies from "cookies";
import httpProxy from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";
import url from "url";
import {
  ACCESS_COOKIE_NAME,
  PROXY_PREFIX,
  REFRESH_COOKIE_NAME,
} from "../../../constants";
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
    const isLogin = pathname?.includes("login/token/");

    const cookies = new Cookies(req, res);
    const authToken = cookies.get(ACCESS_COOKIE_NAME);

    console.log("DEBUG::", "isLogin", isLogin);

    // rewrite the url & add a trailing slash to make django happy
    req.url = req.url?.replace(PROXY_PREFIX, "") + "/";
    console.log("PROXYURL", req.url);

    // don't forward any cookies to the api
    // req.headers.cookie = "";

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
                // THIS LOGIC NEEDS TO BE REPRODUCABLE ON
                // 1: LOGIN
                // 2: REFRESH TOKEN
                // 3: GET SERVER SIDE PROPS

                // on login -- get the access token and send it back with refresh and access token cookies
                const {
                  access,
                  refresh,
                  refresh_expires,
                  access_expires,
                  detail,
                } = JSON.parse(responseBody);
                console.log("GOT RESPONSE BODY", JSON.parse(responseBody));
                // detail is only returned on invalid credentials
                if (detail && !access) {
                  res.status(401).json({ reason: detail });
                  resolve(responseBody);
                } else {
                  const cookies = new Cookies(req, res);
                  cookies.set(ACCESS_COOKIE_NAME, access, {
                    httpOnly: true,
                    sameSite: "lax",
                    expires: new Date(access_expires * 1000),
                  });
                  cookies.set(REFRESH_COOKIE_NAME, refresh, {
                    httpOnly: true,
                    sameSite: "lax",
                    expires: new Date(refresh_expires * 1000),
                  });
                  const payload = {
                    access_token: authToken,
                    refresh_token: refresh,
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
