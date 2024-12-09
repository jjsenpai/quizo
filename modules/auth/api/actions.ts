"use server";

import { createSession } from "@/lib/actions";
import { fetchClient } from "@/lib/fetch";
import { BACKEND_AUTH_URLS } from "@/modules/auth/constants";
import {
  IForgotPassData,
  ILoginData,
  ILoginResponse,
  IResetPasswordData,
  ISignupData,
} from "@/modules/auth/types";

export const login = async (data: ILoginData) => {
  const response = await fetchClient.post<ILoginResponse>({
    url: BACKEND_AUTH_URLS.LOGIN,
    data: data,
    verifySession: false,
    redirect: false,
  });
  await createSession({
    token: response.result.token,
    email: data.email_id,
  });
};

export const signup = async (data: ISignupData) => {
  const response = await fetchClient.post<ILoginResponse>({
    url: BACKEND_AUTH_URLS.SIGNUP,
    data: data,
    verifySession: false,
    redirect: false,
  });
  return response;
};

export const forgotPassword = async (data: IForgotPassData) => {
  await fetchClient.post({
    url: BACKEND_AUTH_URLS.FORGOT_PASSWORD,
    data: data,
    verifySession: false,
    redirect: false,
  });
};

export const resetPassword = async (data: IResetPasswordData) => {
  await fetchClient.post({
    url: BACKEND_AUTH_URLS.RESET_PASSWORD,
    data: data,
    verifySession: false,
    redirect: false,
  });
};
