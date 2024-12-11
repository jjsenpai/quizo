export interface IExamResponse {
  questionId: string;
  selectedOptions: string[];
  answerText: string;
}

export interface IAdditionalAnswers {
  questionId: string;
  answer: string;
}

export interface IAttempExamSchema {
  responses: IExamResponse[];
  additionalResponse: IAdditionalAnswers[];
  exam_id: string;
}

export interface IAttempExamSchemaRequest {
  responses: string;
  additionalResponse: string;
  exam_id: string;
}
