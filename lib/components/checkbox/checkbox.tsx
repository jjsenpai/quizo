import Image from "next/image";
import Check from "@/lib/assets/check.svg";

export const CustomCheck = ({
  isSelected,
  size,
}: {
  isSelected: boolean;
  size?: number;
}) => {
  return (
    <div
      className={`group ${size ? `size-[${size}px]` : "size-[14px]"} shrink-0 rounded border-2 border-[#8B8D98] ${isSelected ? "border-none bg-[#3060ff]" : "bg-white"}`}>
      {isSelected && (
        <Image
          src={Check as string}
          alt="check"
          className={`m-auto size-2 h-full fill-black`}
        />
      )}
    </div>
  );
};
