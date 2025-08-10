interface CustomErrorOptions {
  code: number;
  name?: string;
  message?: string;
}

class CustomError {
  code: number;
  name: string;
  message: string;

  constructor({ code, name = "", message = "" }: CustomErrorOptions) {
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

export const errorMessage = {
  invalidGeneratedAccessToken: new CustomError({
    code: 500,
    name: "invalid GeneratedAccessToken",
    message: "Invalid generated access token",
  }),
  userDoesNotExist: new CustomError({
    code: 404,
    name: "userDoesNotExist",
    message: "User does not exist",
  }),
  incorrectPassword: new CustomError({
    code: 401,
    name: "incorrectPassword",
    message: "Incorrect password",
  }),
  invalidAccessToken: new CustomError({
    code: 401,
    name: "invalidAccessToken",
    message: "Invalid access token",
  }),
  serverError: new CustomError({
    code: 500,
    name: "serverError",
    message: "Server error",
  }),
  emptyRequestBody: new CustomError({
    code: 204,
    name: "emptyRequestBody",
    message: "Empty request body",
  }),
  invalidPatientId: new CustomError({
    code: 404,
    name: "invalidPatientId",
    message: "Invalid patient id",
  }),
};
