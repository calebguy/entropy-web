import Cookies from "cookies";
import { Button, Text } from "dsl";
import { GetServerSideProps } from "next";
import { useCallback } from "react";
import { css, jsonify } from "utils";
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from "../constants";
import redirectToLogin from "../helpers/redirectToLogin";
import AppLayout from "../layouts/App.layout";
import UnauthenticatedError from "../services/exceptions/Unauthenticated.error";
import { Http, HttpProxy } from "../services/Http";

interface MeProps {
  me: any;
}

const MePage = ({ me }: MeProps) => {
  const getMe = useCallback(() => {
    return HttpProxy.getMe().catch((e) => {
      return HttpProxy.refreshToken().then((data) => {
        console.log("refreshed token");
        HttpProxy.getMe();
      });
    });
  }, []);
  return (
    <AppLayout>
      <div className={css("flex", "flex-col", "h-full", "gap-4")}>
        <Text>{jsonify(me)}</Text>
        <Button onClick={() => getMe()}>GET ME</Button>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps<MeProps> = async ({
  req,
  res,
}) => {
  try {
    const cookie = new Cookies(req, res);

    // 1: check for access token
    // 2: if we have it, make the call
    // 3: if we don't, then attempt to refresh using the refreshToken
    // 4: if works then make the call
    // 5: if not then redirect to login

    const accessToken = cookie.get(ACCESS_COOKIE_NAME);
    console.log("GOT ACCESS TOKEN", accessToken);
    if (!accessToken) {
      // return run({ req, res });
      throw new UnauthenticatedError();
    }
    Http.setAccessToken(accessToken);
    const { data: me } = await Http.getMe();
    return { props: { me } };
  } catch (error) {
    return run({ req, res });
  }
};

const run = async ({ req, res }: { req: any; res: any }) => {
  console.log("GOT ERROR ON REQUEST -- trying refresh");
  try {
    const cookie = new Cookies(req, res);
    console.log("could not get access token, trying refresh");

    const refreshToken = cookie.get(REFRESH_COOKIE_NAME);
    if (!refreshToken) {
      throw new UnauthenticatedError();
    }
    console.log("got refresh token", refreshToken);

    // we have to manually set the refresh token since this runs server side
    Http.setRefreshToken(refreshToken);

    // get new tokens
    const { data } = await Http.refreshToken(refreshToken);
    console.log("GOT NEW DATA", data);

    // set new auth cookies to frontend
    const cookies = new Cookies(req, res);
    cookies.set(ACCESS_COOKIE_NAME, data.access, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(data.access_expires * 1000),
    });
    cookies.set(REFRESH_COOKIE_NAME, data.refresh, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(data.refresh_expires * 1000),
    });

    Http.setAccessToken(data.access);
    console.log("GETTING ME AGAIN WITH CORRECT CREDS");

    const { data: me } = await Http.getMe();
    return { props: { me } };
  } catch (e) {
    console.error("got error on refresh", e);
    return redirectToLogin();
  }
};

export default MePage;
