"use client";

import { LoaderWith3Dots } from "@/lib/components/loader";
import { UserType } from "@/lib/constants";
import { ClientError } from "@/lib/fetch";
import { login } from "@/modules/auth/api/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Login = ({ role }: { role: UserType }) => {
  const router = useRouter();

  const [email_id, setEmail_Id] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!loading && email_id && password) {
      try {
        setLoading(true);
        setError("");
        await login({ email_id, password, role });
        router.push(`/${role}/`);
      } catch (error) {
        if ((error as ClientError).message !== "NEXT_REDIRECT") {
          setError("Incorrect Email or Password");
        }
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md rounded-lg bg-white shadow">
        <div className="space-y-6 p-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
            Sign in to Quizzo
          </h1>
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();
              await handleLogin();
            }}>
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-primary focus:ring-primary"
                placeholder="name@company.com"
                value={email_id}
                onChange={(e) => {
                  setEmail_Id(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-primary focus:ring-primary"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <div className="mt-1 text-xs text-red-400">{error}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex h-5 items-center">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="focus:ring-3 focus:ring-primary-300 h-4 w-4 rounded border border-gray-300 bg-gray-50"
                  />
                </div>
                <div className="ml-2 text-xs">
                  <label className="my-auto text-gray-500">Remember me</label>
                </div>
              </div>
              <Link
                href="/forgot"
                className="text-xs font-medium text-dark hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              className="flex h-9 w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-center text-xs font-medium text-white hover:bg-primaryDark focus:outline-none">
              {loading ? <LoaderWith3Dots /> : `Sign in`}
            </button>
            <p className="text-xs font-light text-gray-500">
              Don&apos;t have an account yet?{" "}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
