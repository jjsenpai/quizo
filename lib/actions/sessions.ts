"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, EMAIL_COOKIE_NAME } from "@/auth/constants";

export const createSession = async ({ token, email, exp, ticker }: { token: string; email: string; exp?: number; ticker?: string }) => {
    let expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    if (exp) {
        expiresAt = new Date(exp * 1000);
    }

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
    cookieStore.set(EMAIL_COOKIE_NAME, email, {
        httpOnly: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });

    if (ticker) {
        cookieStore.set("ticker", ticker, {
            httpOnly: true,
            expires: expiresAt,
            sameSite: "lax",
            path: "/",
        });
    }
};

export const verifyAuth = async (req?: NextRequest) => {
    const cookieStore = await cookies();

    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value ?? req?.headers?.get?.(AUTH_COOKIE_NAME);

    if (!token) {
        throw new Error("Missing user token");
    }

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
        return payload;
    } catch (err) {
        console.error("Error in verifying auth", err);
        throw new Error("Token expired");
    }
};

export const deleteSession = async () => {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
    cookieStore.delete(EMAIL_COOKIE_NAME);
    cookieStore.delete("ticker");
};
