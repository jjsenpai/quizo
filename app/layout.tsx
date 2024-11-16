import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quizzo",
  description:
    "Simplifying quiz creation and submission for seamless academic assessments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-[100vh] w-[100vw] bg-gradient-to-tr from-red-500 to-purple-400 antialiased`}>
        {children}
      </body>
    </html>
  );
}
