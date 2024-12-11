import { Quiz } from "@/modules/attempt/views/quiz/quiz";
import { getExamDetails } from "@/modules/create/api/fetch";

const page = async ({ searchParams }: { searchParams: Promise<{ id: string }> }) => {
  const { id } = await searchParams;
  const { data: response, currentTime } = await getExamDetails({ id });
  const questionsSorted = [...response.additionalQuestions, ...response.questions];
  return (
    <Quiz
      response={response}
      currentTime={currentTime}
      questionsSorted={questionsSorted}
    />
  );
};

export default page;
