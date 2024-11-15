"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ClientError } from "@/lib/fetch";
import Show from "@/lib/assets/eye-show.svg";
import Hide from "@/lib/assets/eye-hide.svg";
import { ILoginData } from "@/auth/types";
import { login, publicLogin } from "@/auth/api/actions";
import BackgroundGrid from "@/lib/assets/background-grid.svg";
import PinegapFullLogo from "@/lib/assets/pine-full-logo.svg";
import { FRONTEND_URLS } from "@/lib/constants";

export const Login = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const identifyUser = useCallback((email: string) => {
        localStorage.setItem("emailId", email);
    }, []);

    useEffect(() => {
        const token = searchParams.get("publicToken");
        if (token) {
            setLoading(true);
            publicLogin(token)
                .then(({ ticker, emailId }) => {
                    identifyUser(emailId);
                    if (ticker && ticker.length > 0) {
                        router.push(`${ticker}/insights`);
                    }
                })
                .catch((error: ClientError) => {
                    if (error.message !== "NEXT_REDIRECT") {
                        setError("Incorrect Email or Password");
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [searchParams, identifyUser, router]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const loginData: ILoginData = {
            email_id: email,
            password: password,
        };

        login(loginData)
            .then(() => {
                identifyUser(email);
                router.push(`/MSFT/insights`);
            })
            .catch((error: ClientError) => {
                if (error.message !== "NEXT_REDIRECT") {
                    setError("Incorrect Email or Password");
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className={"z-20 flex aspect-square flex-col items-center justify-center"}>
            <Image src={BackgroundGrid as string} className="absolute top-0" alt="grid" />
            <Image src={PinegapFullLogo as string} alt="pinegap logo" className={"z-20 mb-4 h-[48px]"} />
            <div className={"z-20 mb-16 pt-5 text-[30px] font-medium leading-[36px]"}>Login to your account</div>
            <div className={"z-20 w-[440px] rounded-3xl bg-white p-[40px] pt-[32px] shadow-md"}>
                {loading ? (
                    <div className="flex items-center justify-center">
                        <div className={"h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"} />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-[20px]">
                            <label htmlFor="email" className={"mb-[6px] block text-[14px] font-medium leading-[19px] text-gray-600"}>
                                Email*
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className={
                                    "relative h-[40px] w-full rounded-lg border p-2 placeholder:text-[16px] placeholder:font-normal placeholder:leading-[20px] placeholder:text-[#94A3B7] focus:border-blue-300 focus:outline-none focus:ring"
                                }
                                required
                                value={email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-[24px]">
                            <label htmlFor="password" className={"mb-[6px] block text-[14px] font-medium leading-[19px] text-gray-600"}>
                                Password*
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    className={
                                        "relative h-[40px] w-full rounded-lg border p-2 placeholder:text-[16px] placeholder:font-normal placeholder:leading-[20px] placeholder:text-[#94A3B7] focus:border-blue-300 focus:outline-none focus:ring"
                                    }
                                    required
                                    value={password}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                    className={"absolute right-3"}
                                >
                                    {password.length > 1 &&
                                        (showPassword ? <Image src={Hide as string} alt="hide" /> : <Image src={Show as string} alt="hide" />)}
                                </button>
                            </div>
                            {error && <div className={"mb-2 mt-1 text-red-500"}>{error}</div>}
                            <Link
                                href={FRONTEND_URLS.FORGOT_PASSWORD}
                                className="ml-auto mt-1 flex w-fit cursor-pointer justify-end pt-1 text-[14px] font-semibold text-[#305EFF]"
                            >
                                Forgot/Reset Password?
                            </Link>
                        </div>
                        <div className={"flex flex-col items-center justify-center"}>
                            <button
                                className={
                                    "h-[40px] w-full rounded-lg bg-[#305EFF] px-4 text-[16px] leading-[20px] text-white hover:bg-blue-600 focus:border-blue-300 focus:outline-none focus:ring"
                                }
                                type="submit"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
