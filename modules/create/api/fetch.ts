"use server";

import { fetchClient } from "@/lib/fetch";
import { IUpdateExamResponse } from "@/lib/types";

export const getExamDetails = async ({ id }: { id: string }) => {
  const response = await fetchClient.get<{
    data: IUpdateExamResponse;
    currentTime: string;
  }>({
    url: "/exams/",
    params: { id },
  });
  return response;
};
