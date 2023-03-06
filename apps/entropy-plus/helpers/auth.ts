import { GetServerSidePropsContext } from "next";
import { ACCESS_COOKIE_NAME } from "../pages/api/proxy/[...path]";
const Cookies = require("cookies");

interface getAccessTokenParams
  extends Pick<GetServerSidePropsContext, "res" | "req"> {}

export default function getAccessToken({
  req,
  res,
}: getAccessTokenParams): string {
  const cookies = new Cookies(req, res);
  const accessToken = cookies.get(ACCESS_COOKIE_NAME);
  if (!accessToken) {
    throw new Error("No access token");
  }
  return accessToken;
}
