"use server";

import { jwtVerify } from "jose";
import { createSession } from "@/lib/actions";
import { fetchClient } from "@/lib/fetch";
import { BACKEND_AUTH_URLS } from "@/auth/constants";
import { IForgotPassData, ILoginData, ILoginResponse, IResetPasswordData } from "@/auth/types";

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

export const publicLogin = async (token: string) => {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY));

    const { email_id, exp, ticker } = payload;
    await createSession({
        token: token,
        email: email_id as string,
        ticker: (ticker as string) ?? "",
        exp: exp!,
    });
    return { ticker: (ticker as string) ?? "", emailId: email_id as string };
};
