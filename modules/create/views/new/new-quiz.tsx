"use client";

import Back from "@/lib/assets/back-button.svg";
import { LoaderWith3Dots } from "@/lib/components/loader";
import { IAdditionalQuestions } from "@/lib/types";
import { CreateExam } from "@/modules/create/api/action";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const NewQuiz = () => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [additionalQuestions, setAdditionalQuestions] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const questionArray: IAdditionalQuestions[] = [];

      additionalQuestions.split(",").forEach((val) => {
        questionArray.push({ questionId: uuidv4(), text: val });
      });

      const response = await CreateExam({
        additional_questions: JSON.stringify(questionArray),
        end_time: new Date(end).toISOString(),
        start_time: new Date(start).toISOString(),
        title: title,
      });
      router.push(`/create/events/modify?id=${response.data.id}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col space-y-6 overflow-hidden rounded-3xl p-4">
      <div className="flex gap-4 pt-6 text-[22px] font-bold leading-tight tracking-tight text-gray-900">
        <Link
          href={"/create"}
          className="flex size-6 shrink-0 items-center justify-center">
          <Image src={Back as string} alt="<" />
        </Link>
        <h1>Create quiz</h1>
      </div>
      <form
        className="h-full space-y-6"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit();
        }}>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">Title</label>
          <input
            name="title"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary"
            placeholder="Sample quiz 1"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Start Time
          </label>
          <input
            type="datetime-local"
            name="start"
            id="start"
            placeholder="••••••••"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary"
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            End Time
          </label>
          <input
            type="datetime-local"
            name="start"
            id="start"
            placeholder="••••••••"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary"
            value={end}
            onChange={(e) => {
              setEnd(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Additional Questions (Separated by comma)
          </label>
          <input
            name="Additional Questions"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary"
            placeholder="E.g. Roll no."
            value={additionalQuestions}
            onChange={(e) => {
              setAdditionalQuestions(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-auto flex h-12 w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primaryDark focus:outline-none">
          {loading ? <LoaderWith3Dots /> : `Create`}
        </button>
      </form>
    </div>
  );
};
