import { getAllExams } from "@/lib/actions/quiz";
import { Create } from "@/modules/create/create";

const page = async () => {
  const { data: response } = await getAllExams();
  return <Create response={response} />;
};

export default page;
