import Image from "next/image";
import InfoIcon from "@/lib/assets/info.svg";

export const Toast = ({
  heading,
  body,
  icon,
}: {
  heading: string;
  body?: string;
  icon?: string;
}) => (
  <div className="flex flex-col rounded-sm">
    <div className="flex gap-3">
      <Image alt="" loading="lazy" src={(icon ?? InfoIcon) as string} className="w-5" />
      <p className="text-[15px] font-medium text-zinc-800">{heading}</p>
    </div>
    {body && (
      <div className="ml-[32px] flex w-[313px] min-w-[240px] flex-col">
        <p className="mt-1.5 text-[14px] text-neutral-400">{body}</p>
      </div>
    )}
  </div>
);
