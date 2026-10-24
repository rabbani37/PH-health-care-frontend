"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/svg/logo";
import Link from "next/link";
import { UserRole } from "@/types/user.type";
import { adminRoutes, doctorRoutes, patientRoutes } from "@/routes";
import { SidebarItems } from "@/types/sidebar.type";
import { usePathname } from "next/navigation";


const sidebarRoutes:Partial<Record<UserRole, SidebarItems>> = {
  ADMIN: adminRoutes,
  DOCTOR: doctorRoutes,
  PATIENT:patientRoutes,
  SUPER_ADMIN:adminRoutes
};

export function DashboardSidebar({ userRole }: { userRole: UserRole }) {
  const routes = sidebarRoutes[userRole] ||[];
  const pathname = usePathname()



  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 font-medium">
          <div className="flex  items-center justify-center rounded-md  ">
            <Logo />
          </div>
          PH Healthcare
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton render={<Link href={item.url} />} isActive={pathname=== item.url}>
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
