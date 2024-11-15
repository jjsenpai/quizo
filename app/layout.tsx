import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Quizzo",
    description: "Simplifying quiz creation and submission for seamless academic assessments.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={` antialiased`}>{children}</body>
        </html>
    );
}
