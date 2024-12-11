"use client";

import Add from "@/lib/assets/add-button.svg";
import Image from "next/image";
import Link from "next/link";
import Edit from "@/lib/assets/edit-icon.svg";
import MenuIcon from "@/lib/assets/hamburger.svg";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { deleteSession } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { GetAllExamsResponse } from "@/lib/types";
import { QuizType } from "@/lib/constants";

export const Create = ({ response }: { response: GetAllExamsResponse }) => {
  const upcomingQuizes = response.filter((quiz) => quiz.tag === QuizType.Upcoming);
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
          <h1>Upcoming Quizzes</h1>
          <div className="flex flex-col gap-6 text-[16px] font-normal">
            {upcomingQuizes.length > 0 ? (
              upcomingQuizes.map((quiz, idx) => (
                <div className="flex items-start justify-between" key={idx}>
                  <div className="flex flex-col gap-1">
                    <p>{quiz.title}</p>
                    <p className="text-[14px] text-[#61758A]">
                      {new Date(quiz.startTime).toString()}
                    </p>
                  </div>
                  <Link
                    href={`/create/events/modify?id=${quiz.id}`}
                    className="mt-1 size-6 shrink-0">
                    <Image src={Edit as string} alt="edit" />
                  </Link>
                </div>
              ))
            ) : (
              <div className="flex w-full flex-col items-center justify-center text-gray-400">
                No task available
              </div>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center justify-end">
          <Link
            href={"/create/new"}
            className="flex items-center justify-center gap-4 rounded-xl bg-[#960DF2] p-4">
            <div className="flex size-6 items-center justify-center">
              <Image src={Add as string} alt="+" />
            </div>
            <div>Create a quiz</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
