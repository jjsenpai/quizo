import { FC, SVGProps } from "react";

export const FilterUnselectedSVG: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20 36h8v-4h-8v4zm-14-24v4h36v-4h-36zm6 14h24v-4h-24v4z" />
      <path d="M0 0h48v48h-48z" fill="none" />
    </svg>
  );
};

export const FilterSelectedSVG: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="7"
      height="7"
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M3.07921 6.85767C2.95998 6.85767 2.86005 6.81735 2.77939 6.7367C2.69874 6.65604 2.65842 6.55611 2.65842 6.43688V3.91213L0.217822 0.798267C0.112624 0.658003 0.0968441 0.510726 0.170483 0.356436C0.244121 0.202145 0.372112 0.125 0.554455 0.125H6.44555C6.62789 0.125 6.75588 0.202145 6.82952 0.356436C6.90316 0.510726 6.88738 0.658003 6.78218 0.798267L4.34158 3.91213V6.43688C4.34158 6.55611 4.30126 6.65604 4.22061 6.7367C4.13995 6.81735 4.04002 6.85767 3.92079 6.85767H3.07921Z"
        fill="currentColor"
      />
    </svg>
  );
};
