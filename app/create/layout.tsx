import { Footer } from "@/modules/create/footer";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center px-4 py-8">
      <div className="flex h-full w-full max-w-2xl flex-1 flex-col justify-between rounded-lg bg-white shadow">
        <div className="h-full w-full flex-1 overflow-y-auto">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default layout;
