import BaseError from "./Base.error";

class UnauthenticatedError extends BaseError {
  constructor(message?: string) {
    super(message);
    this.name = "UnauthenticatedError";
  }
}

export default UnauthenticatedError;
