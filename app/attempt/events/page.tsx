import { getAllExams } from "@/lib/actions/quiz";
import { Events } from "@/modules/create/views/events/events";

const page = async () => {
  const { data: response } = await getAllExams();
  return <Events response={response} />;
};

export default page;
