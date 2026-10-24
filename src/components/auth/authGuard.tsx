"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./authLoading";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: user, isPending, isError } = useGetMe();

  // console.log(user);

  useEffect(() => {
    if (isPending) return;

    if (isError || !user) {
      router.replace("/login");
    }
  }, [user, isPending, isError, router]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (isError || !user) {
     return <AuthLoading lable="Redirecting..." />;
  }

  return <>{children}</>;
}
