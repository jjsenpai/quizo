"use client";

import Image from "next/image";
import Edit from "@/lib/assets/edit-icon.svg";
import MenuIcon from "@/lib/assets/hamburger.svg";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
// import { FilterUnselectedSVG } from "@/lib/assets/filter-svg";
import { deleteSession } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GetAllExamsResponse } from "@/lib/types";
import { QuizType } from "@/lib/constants";

export const Events = ({ response }: { response: GetAllExamsResponse }) => {
  const router = useRouter();
  const incompleteQuizes = response.filter(
    (quiz) => quiz.questions && quiz.questions.length === 0,
  );
  const pastQuizzes = response.filter(
    (quiz) =>
      ![QuizType.Upcoming, QuizType.Ongoing].includes(quiz.tag) &&
      quiz.questions.length > 0,
  );
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
      <div className="flex flex-col gap-6 text-[22px] font-bold leading-tight tracking-tight text-gray-900">
        <h1>Incomplete quizzes</h1>
        <div className="flex flex-col gap-6 text-[16px] font-normal">
          {incompleteQuizes.length > 0 ? (
            incompleteQuizes.map((quiz, idx) => (
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
      <div className="flex flex-col gap-6 pt-6 text-[22px] font-bold leading-tight tracking-tight text-gray-900">
        <div className="flex items-center justify-between">
          <h1>Past quizzes</h1>
        </div>
        <div className="flex flex-col gap-6 text-[16px] font-normal">
          {pastQuizzes.length > 0 ? (
            pastQuizzes.map((quiz, idx) => (
              <div className="flex items-start justify-between gap-2" key={idx}>
                <div className="flex flex-col justify-center gap-1">
                  <p>{quiz.title}</p>
                  <p className="text-[14px] text-[#61758A]">
                    {new Date(quiz.startTime)
                      .toString()
                      .split(" ")
                      .slice(0, 4)
                      .join(" ")}
                  </p>
                </div>
                {quiz.tag === QuizType.Due ? (
                  <span className="me-2 ml-auto mt-2 shrink-0 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    Result Due
                  </span>
                ) : (
                  <span className="me-2 ml-auto mt-2 shrink-0 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Completed
                  </span>
                )}
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
    </div>
  );
};
