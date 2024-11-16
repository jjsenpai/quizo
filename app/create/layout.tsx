export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="absolute inset-0 mx-auto flex w-5/6 max-w-lg flex-col items-center justify-center text-center">
      {children}
    </div>
  );
}
