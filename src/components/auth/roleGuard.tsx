"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./authLoading";
import { UserRole } from "@/types/user.type";
import AccessDenied from "./accessDenied";

interface IProps {
  children: ReactNode;
  roles: UserRole[];
}
export default function RoleGuard({ children, roles }: IProps) {
  const router = useRouter();
  const { data: user, isPending, isError } = useGetMe();

  const isAuthorized = user && roles.includes(user.role);

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

  if(!isAuthorized){
      return <>{children}</>;
    
  }

  return <> <AccessDenied /></>
}
