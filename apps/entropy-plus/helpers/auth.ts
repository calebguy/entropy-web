import { NextRequest } from "next/server";
import { ACCESS_COOKIE_NAME } from "../pages/api/proxy/[...path]";
import UnauthenticatedError from "../services/exceptions/Unauthenticated.error";
const Cookies = require("cookies");

export default function getAccessToken(req: NextRequest): string {
  const cookies = new Cookies(req);
  const accessToken = cookies.get(ACCESS_COOKIE_NAME);
  if (!accessToken) {
    throw new UnauthenticatedError();
  }
  return accessToken;
}
