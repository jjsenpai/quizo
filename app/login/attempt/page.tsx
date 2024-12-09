import { UserType } from "@/lib/constants";
import { Login } from "@/modules/auth/views/login";

const AttemptLogin = () => {
  return <Login role={UserType.User} />;
};

export default AttemptLogin;
