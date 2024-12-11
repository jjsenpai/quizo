"use server";

import { fetchClient } from "@/lib/fetch";
import { ICreateExamSchema, IUpdateExamSchema } from "@/lib/types";

export const CreateExam = async (data: ICreateExamSchema) => {
  const response = await fetchClient.post<{ data: IUpdateExamSchema }>({
    url: "/exams",
    data: data,
  });
  return response;
};

export const UpdateExam = async (data: IUpdateExamSchema) => {
  const response = await fetchClient.post<{ data: IUpdateExamSchema }>({
    url: "/exams/update",
    data: data,
  });
  return response;
};
