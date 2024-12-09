import { UserType } from "@/lib/constants";
import { Login } from "@/modules/auth/views/login";

const CreateLogin = () => {
  return <Login role={UserType.Teacher} />;
};

export default CreateLogin;
