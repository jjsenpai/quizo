import Link from "next/link";

export default function Landing() {
  return (
    <>
      <div className="relative h-screen w-screen">
        <div className="absolute inset-0 mx-auto flex w-5/6 max-w-lg flex-col items-center justify-center text-center">
          <div className="space-y-8">
            <h1 className="font-primary text-3xl font-extrabold text-white sm:text-4xl md:text-5xl md:leading-tight">
              Design and Attempt tests on&nbsp;
              <span className="text-palette-primary">Quizo.</span>
            </h1>
            <p className="font-secondary text-base text-palette-light md:text-lg lg:text-xl">
              Simplifying quiz creation and submission for seamless academic
              assessments.
            </p>
            <div className="mx-auto flex w-full max-w-lg flex-shrink justify-center px-2 font-secondary">
              <Link
                href={"/create"}
                className={`min-w-24 rounded-l-lg border border-transparent bg-white px-4 py-3 text-sm font-semibold text-palette-primary hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:text-base`}>
                Create
              </Link>
              <Link
                href={"/attempt"}
                className={`min-w-24 rounded-r-lg border border-transparent bg-palette-primary px-4 py-3 text-sm font-semibold text-white hover:bg-palette-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-palette-primary focus-visible:ring-offset-2 sm:text-base`}>
                Attempt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
