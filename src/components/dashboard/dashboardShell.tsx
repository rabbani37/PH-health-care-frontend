import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboardSidebar";
import React from "react";
import { UserRole } from "@/types/user.type";

type TProps = { children: React.ReactNode; userRole: UserRole};

export default function DashboardShell({ children, userRole }: TProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar userRole={userRole} ></DashboardSidebar>
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1"></SidebarTrigger>
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>

    </SidebarProvider>
  );
}
