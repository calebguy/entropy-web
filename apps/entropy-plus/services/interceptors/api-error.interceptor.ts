import { AxiosError } from "axios";
import ApiError from "../exceptions/Api.error";
import UnauthenticatedError from "../exceptions/Unauthenticated.error";

const ApiErrorInterceptor = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    if (status === 500) {
      console.error("axios got 500");
    } else if (status === 401) {
      // IF HTTP IS MAKING CALLS TO PROXY THEN WE NEED TO TRY TO REFRESH THE TOKEN
      // BY MAKING A CALL TO /api/login/token/refresh/
      // WITHING THE PROXY CALL WE NEED TO CHECK IF THE CALL IS REFRESH
      // IF SO THEN WE NEED TO GET THE RESPONSE AND SET THE COOKIES
      console.error("axios got 401");
      throw new UnauthenticatedError();
      // @ts-ignore
    } else if (error.response.data && error.response.data?.message) {
      // @ts-ignore
      const message = error.response.data.message;
      console.error("axios error with message:", message);
      throw new ApiError(Array.isArray(message) ? message[0] : message);
    } else if (status === 400) {
      console.error(error.response?.data);
      console.error("axios got 400");
      throw new ApiError();
    }
  } else if (error.request) {
    // errorToast("Network error");
  }
  throw error;
};

export default ApiErrorInterceptor;
