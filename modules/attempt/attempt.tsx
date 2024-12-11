"use client";

import Image from "next/image";
import MenuIcon from "@/lib/assets/hamburger.svg";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { deleteSession } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Attempt = () => {
  const [id, setId] = useState<string>("");
  const router = useRouter();
  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto rounded-3xl p-4">
      <div className="flex h-10 w-full shrink-0 items-end justify-end">
        <div className="flex size-6 items-center justify-center">
          <Menu>
            <MenuButton className="item-center flex rounded-full">
              <Image src={MenuIcon as string} alt="user image" />
            </MenuButton>
            <MenuItems anchor={{ to: "bottom end", gap: 2 }}>
              <div className="mt-2 rounded-xl border bg-white px-4 py-2 text-sm text-black">
                <button
                  onClick={async () => {
                    localStorage.removeItem("emailId");
                    await deleteSession();
                    router.push("/");
                  }}>
                  Logout
                </button>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-6 text-[22px] font-bold leading-tight tracking-tight text-gray-900">
          <h1>Attempt a quiz</h1>
          <div className="flex flex-col justify-center gap-6 text-[16px] font-normal">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (id) {
                  router.push(`/attempt/quiz?id=${id}`);
                }
              }}>
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-900">
                  Quiz Id
                </label>
                <input
                  name="name"
                  id="name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-primary focus:ring-primary"
                  placeholder="Enter quiz id to get started"
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                className="flex h-9 w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-center text-xs font-medium text-white hover:bg-primaryDark focus:outline-none">
                {`Start`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
