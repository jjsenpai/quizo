import { redirect as nextRedirect } from "next/navigation";
import { deleteSession } from "@/lib/actions/sessions";
import { ClientError } from "@/lib/fetch/error-handler";
import { ErrorResponse } from "@/lib/fetch/types";

export const processResponse = async <TResponse>(
  response: Response,
  redirect = true,
) => {
  if ([401, 403].includes(response.status)) {
    await deleteSession();
    if (redirect) {
      nextRedirect("/");
    } else {
      const data = (await response.json()) as ErrorResponse;
      throw new ClientError(response.status, data);
    }
  }

  if (response.ok) {
    return (await response.json()) as TResponse;
  }

  const data = (await response.json()) as ErrorResponse;
  throw new ClientError(response.status, data);
};
