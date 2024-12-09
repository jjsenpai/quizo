import { UserType } from "@/lib/constants";

export interface ILoginData {
  email_id: string;
  password: string;
  role: string;
}

export interface ISignupData {
  email_id: string;
  name: string;
  password: string;
  dob: string;
  institute: string;
  role: UserType;
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
