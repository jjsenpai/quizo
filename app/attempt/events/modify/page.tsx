import { getExamDetails } from "@/modules/create/api/fetch";
import { Modify } from "@/modules/create/views/modify/modify";

const page = async ({ searchParams }: { searchParams: Promise<{ id: string }> }) => {
  const { id } = await searchParams;
  const { data: details } = await getExamDetails({ id: id });
  console.log(details);
  return <Modify details={details} />;
};

export default page;
