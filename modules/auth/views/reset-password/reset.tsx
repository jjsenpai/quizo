import { LoaderWith3Dots } from "@/lib/components/loader";
import { ClientError } from "@/lib/fetch";
import { resetPassword } from "@/modules/auth/api/actions";
import Link from "next/link";
import { useState } from "react";

export const Reset = ({ token }: { token: string }) => {
  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!loading && password) {
      try {
        setLoading(true);
        setError("");
        await resetPassword({ token, password });
        setSuccess("Password reset successful. Login to continue.");
      } catch (error) {
        if ((error as ClientError).message !== "NEXT_REDIRECT") {
          setError("Incorrect Email or Password");
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md rounded-lg bg-white shadow">
        <div className="space-y-6 p-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
            Reset Password
          </h1>
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();
              await handleLogin();
            }}>
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-900">
                Password
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-primary focus:ring-primary"
                placeholder="name@company.com"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <div className="mt-1 text-xs text-red-400">{error}</div>
              <div className="mt-1 text-xs text-red-400">{success}</div>
            </div>
            <button
              type="submit"
              onClick={handleLogin}
              className="flex h-9 w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-center text-xs font-medium text-white hover:bg-primaryDark focus:outline-none">
              {loading ? <LoaderWith3Dots /> : `Submit`}
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
