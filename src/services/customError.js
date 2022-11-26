class CustomError {
  constructor({ code, name = "", message = "" }) {
    this.code = code;
    this.name = name;
    this.message = message;
  }

  get getCode() {
    return this.code;
  }

  get getName() {
    return this.name;
  }

  get getMessage() {
    return this.message;
  }
}

export default CustomError;

export const ERROR_MESSAGE = {
  invalidGeneratedAccessToken: {
    name: "invalid GeneratedAccessToken",
    message: "Invalid generated access token",
  },
  userDoesNotExist: {
    name: "userDoesNotExist",
    message: "User does not exist",
  },
  incorrectPassword: {
    name: "incorrectPassword",
    message: "Incorrect password",
  },
  invalidAccessToken: {
    name: "invalidAccessToken",
    message: "Invalid access token",
  },
  serverError: {
    name: "serverError",
    message: "Server error",
  },
};
