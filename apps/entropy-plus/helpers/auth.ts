import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from "../constants";
import { AuthTokens } from "../interfaces";
import { HttpForServer } from "../services/Http";
import UnauthenticatedError from "../services/exceptions/Unauthenticated.error";
import redirectToLogin from "./redirectToLogin";
const Cookies = require("cookies");

// @next -- attach current user onto the session
export default function withAuth<T>(
  callback: (
    context: GetServerSidePropsContext,
    accessToken: string
  ) => Promise<GetServerSidePropsResult<T>>
) {
  return async (context: GetServerSidePropsContext) => {
    try {
      const cookie = new Cookies(context.req, context.res);
      const accessToken = cookie.get(ACCESS_COOKIE_NAME);
      const refreshToken = cookie.get(REFRESH_COOKIE_NAME);
      if (!accessToken) {
        throw new UnauthenticatedError();
      }
      HttpForServer.setAccessToken(accessToken);
      HttpForServer.setRefreshToken(refreshToken);
      return callback(context, accessToken);
    } catch (e) {
      if (e instanceof UnauthenticatedError) {
        const cookie = new Cookies(context.req, context.res);
        const refreshToken = cookie.get(REFRESH_COOKIE_NAME);
        if (!refreshToken) {
          return redirectToLogin();
        }
        HttpForServer.setRefreshToken(refreshToken);
        try {
          const { data: authData } = await HttpForServer.refreshToken();
          setCookies({ req: context.req, res: context.res, authData });
          HttpForServer.setAccessToken(authData.access);
          HttpForServer.setRefreshToken(authData.refresh);
          return callback(context, authData.access);
        } catch (e) {
          return redirectToLogin();
        }
      }
      return redirectToLogin();
    }
  };
}

export function setCookies({
  req,
  res,
  authData: { access, access_expires, refresh, refresh_expires },
}: {
  req: any;
  res: any;
  authData: AuthTokens;
}) {
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
  return cookies;
}
