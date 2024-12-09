export const LoaderWith3Dots = () => {
  return (
    <div className="flex h-fit w-fit items-center justify-center space-x-[2.7px]">
      <span className="sr-only">Loading...</span>
      <div className="size-1 animate-[loader_1s_infinite] rounded-full bg-[#D9D9D9]"></div>
      <div className="size-1 animate-[loader_1s_infinite] rounded-full bg-[#D9D9D9] [animation-delay:0.33s]"></div>
      <div className="size-1 animate-[loader_1s_infinite] rounded-full bg-[#D9D9D9] [animation-delay:0.66s]"></div>
    </div>
  );
};
