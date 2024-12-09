"use client";

import { verifyToken } from "@/lib/actions/sessions";
import { Reset } from "@/modules/auth/views/reset-password/reset";
import { notFound } from "next/navigation";

const page = async ({ searchParams }: { searchParams: Promise<{ token: string }> }) => {
  const { token } = await searchParams;
  try {
    await verifyToken(token);
    return <Reset token={token} />;
  } catch {
    notFound();
  }
};

export default page;
