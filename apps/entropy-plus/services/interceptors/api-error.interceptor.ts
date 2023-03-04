import { AxiosError } from "axios";
import ApiError from "../exceptions/Api.error";
import UnauthenticatedError from "../exceptions/Unauthenticated.error";

const ApiErrorInterceptor = (error: AxiosError) => {
  console.log("debug:: GOT ERROR", error);
  if (error.response) {
    const status = error.response.status;
    if (status === 500) {
      //   errorToast("500 error");
    } else if (status === 401) {
      throw new UnauthenticatedError();
      //@ts-ignore
    } else if (error.response.data && error.response.data.message) {
      // @ts-ignore
      const message = error.response.data.message;
      //   debugToast("Didn't work");
      console.log("debug:: message", message);
      throw new ApiError(Array.isArray(message) ? message[0] : message);
    } else if (status === 400) {
      throw new ApiError();
    }
  } else if (error.request) {
    // errorToast("Network error");
  }
  throw error;
};

export default ApiErrorInterceptor;
