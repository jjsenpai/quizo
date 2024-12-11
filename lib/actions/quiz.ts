"use server";

import { fetchClient } from "@/lib/fetch";
import { GetAllExamsResponse } from "@/lib/types";

export const getAllExams = async () => {
  return await fetchClient.get<{ data: GetAllExamsResponse }>({
    url: "/exams/all",
  });
};
