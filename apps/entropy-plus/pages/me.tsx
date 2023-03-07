import Cookies from "cookies";
import { Button, Text } from "dsl";
import { GetServerSideProps } from "next";
import { useCallback } from "react";
import { css, jsonify } from "utils";
import { ACCESS_COOKIE_NAME } from "../constants";
import redirectToLogin from "../helpers/redirectToLogin";
import AppLayout from "../layouts/App.layout";
import UnauthenticatedError from "../services/exceptions/Unauthenticated.error";
import { Http, HttpProxy } from "../services/Http";

interface MeProps {
  me: any;
}

const MePage = ({ me }: MeProps) => {
  const getMe = useCallback(() => {
    return HttpProxy.getMe();
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
    // 2: if we have it, make the calle
    // 3: if we don't, then attempt to refresh using the refreshToken
    // 4: if works then make the call
    // 5: if not then redirect to login

    const accessToken = cookie.get(ACCESS_COOKIE_NAME);
    console.log("ACCESS TOKEN IN GET SERVER SIDE PROPS", accessToken);
    if (!accessToken) {
      throw new UnauthenticatedError();
    }
    Http.setAccessToken(accessToken);
    const { data: me } = await Http.getMe();
    return { props: { me } };
  } catch (error) {
    console.log("error", error);
    return redirectToLogin();
  }
};

export default MePage;
