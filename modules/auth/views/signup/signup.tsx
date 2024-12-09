"use client";

import { LoaderWith3Dots } from "@/lib/components/loader";
import { UserType } from "@/lib/constants";
import { ClientError } from "@/lib/fetch";
import { signup } from "@/modules/auth/api/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Signup = () => {
  const router = useRouter();

  const [email_id, setEmail_Id] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [institute, setInstitute] = useState<string>("");
  const [isTeacher, setIsTeacher] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!loading && email_id && password && name && institute) {
      try {
        setLoading(true);
        setError("");
        const role = isTeacher ? UserType.Teacher : UserType.User;
        await signup({
          name,
          dob: new Date().toString(),
          institute,
          email_id,
          password,
          role: role,
        });
        router.push(`/${role}`);
      } catch (error) {
        console.error(error);
        if ((error as ClientError).message !== "NEXT_REDIRECT") {
          setError("Something went wrong.");
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
            Create an account
          </h1>
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();
              await handleLogin();
            }}>
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-900">
                Name
              </label>
              <input
                name="name"
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-primary focus:ring-primary"
                placeholder="name@company.com"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-900">
                Institute
              </label>
              <input
                name="institute"
                id="institute"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-primary focus:ring-primary"
                placeholder="name@company.com"
                value={institute}
                onChange={(e) => {
                  setInstitute(e.target.value);
                }}
                required
              />
            </div>
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
                    checked={isTeacher}
                    onChange={() => {
                      setIsTeacher(!isTeacher);
                    }}
                    className="focus:ring-3 focus:ring-primary-300 h-4 w-4 rounded border border-gray-300 bg-gray-50"
                  />
                </div>
                <div className="ml-2 text-xs">
                  <label className="my-auto text-gray-500">Are you a teacher?</label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              className="flex h-9 w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-center text-xs font-medium text-white hover:bg-primaryDark focus:outline-none">
              {loading ? <LoaderWith3Dots /> : `Sign Up`}
            </button>
            <p className="flex gap-1 text-xs font-light text-gray-500">
              Have an account?
              <Link
                href="/login/create"
                className="font-medium text-primary hover:underline">
                Create
              </Link>
              or
              <Link
                href="/login/attempt"
                className="font-medium text-primary hover:underline">
                Attempt
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
