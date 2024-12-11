import { QuizType } from "@/lib/constants";

export interface IQuestionData {
  "question-title": string;
  type: number;
  a: string;
  b: string;
  c: string;
  d: string;
  "correct-options": string;
  "correct-ans": string;
  marks: number;
}

export interface IQuestionRequest {
  questionId: string;
  options: { optionId: string; text: string }[];
  correctOptions: string[];
  answerText: string;
  questionText: string;
  questionType: number;
  marks: number;
}

export interface IAdditionalQuestions {
  questionId: string;
  text: string;
}
export interface IUpdateExamSchema {
  id: string;
  questions: string;
  additional_questions: string;
  start_time: string;
  end_time: string;
  title: string;
}

export interface IUpdateExamResponse {
  id: number;
  questions: IQuestionRequest[];
  additionalQuestions: IAdditionalQuestions[];
  startTime: string;
  duration: number;
  title: string;
  tag: QuizType;
}

export interface ICreateExamSchema {
  title: string;
  start_time: string;
  end_time: string;
  additional_questions: string;
}

export type GetAllExamsResponse = IUpdateExamResponse[];
