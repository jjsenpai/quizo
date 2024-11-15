"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BackgroundGrid from "@/lib/assets/background-grid.svg";
import PinegapFullLogo from "@/lib/assets/pine-full-logo.svg";
import { FRONTEND_URLS } from "@/lib/constants";
import { forgotPassword } from "@/auth/api/actions";

export const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === "email") {
            setEmail(value);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        forgotPassword({
            email_id: email,
        })
            .then(() => {
                setSuccess("Password reset link sent to your email");
            })
            .catch(() => {
                setError("Something went wrong");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="z-20 flex aspect-square flex-col items-center justify-center">
            <Image src={BackgroundGrid as string} className="absolute top-0" alt="grid" />
            <Image src={PinegapFullLogo as string} alt="pinegap logo" className={"z-20 mb-4 h-[48px]"} />
            <div className={"z-20 mb-16 pt-5 text-[30px] font-medium leading-[36px]"}>Reset your password</div>
            <div className="z-20 w-[440px] rounded-3xl bg-white p-[40px] pt-[32px] shadow-md">
                {loading ? (
                    <div className="flex items-center justify-center">
                        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="mb-[6px] block text-[14px] font-medium leading-[19px] text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="relative mt-1 h-[40px] w-full rounded-lg border p-2 placeholder:text-[16px] placeholder:font-normal placeholder:leading-[20px] placeholder:text-[#94A3B7] focus:border-blue-300 focus:outline-none focus:ring"
                                required
                                value={email}
                                onChange={handleInputChange}
                            />
                            {error && <div className="mb-2 mt-1 text-red-500">{error}</div>}
                            {success && <div className="mb-2 mt-1 text-green-500">{success}</div>}
                            <Link
                                href={FRONTEND_URLS.LOGIN}
                                className="ml-auto mt-1 flex w-fit cursor-pointer justify-end pt-1 text-[14px] font-semibold text-[#305EFF]"
                            >
                                Go To Login
                            </Link>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <button
                                className="h-[40px] w-full rounded-lg bg-[#305EFF] px-4 text-[16px] leading-[20px] text-white hover:bg-blue-600 focus:border-blue-300 focus:outline-none focus:ring"
                                type="submit"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
