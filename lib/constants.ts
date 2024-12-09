export const FRONTEND_URLS = {
  SIGNUP: "/signup",
  LOGIN_CREATE: "/login/create",
  LOGIN_ATTEMPT: "/login/attempt",
  FORGOT_PASSWORD: "/forgot",
  RESET_PASSWORD: "/reset",
};

export enum UserType {
  Teacher = "create",
  User = "attempt",
  Admin = "ADMIN",
}
