export interface ILoginData {
  email_id: string;
  password: string;
}

export interface ILoginResponse {
  result: {
    token: string;
  };
}

export interface IForgotPassData {
  email_id: string;
}

export interface IResetPasswordData {
  token: string;
  password: string;
}
