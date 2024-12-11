"use server";

import { fetchClient } from "@/lib/fetch";
import { IAttempExamSchemaRequest } from "@/modules/attempt/types";

export const postQuizData = async (data: IAttempExamSchemaRequest) => {
  console.log(data);
  return await fetchClient.post<{ currentTime: string }>({
    url: "/exams/attempt",
    data: { data },
  });
};
