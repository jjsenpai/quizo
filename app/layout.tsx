import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Quizzo",
  description:
    "Simplifying quiz creation and submission for seamless academic assessments.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`h-[100vh] w-[100vw] bg-[#111111] font-primary antialiased`}>
        <AppRouterCacheProvider>
          {children}
          <ToastContainer
            style={{ width: "400px" }}
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={true}
            closeOnClick
            draggable
          />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
