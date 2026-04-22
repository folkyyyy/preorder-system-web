"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, redirect } from "next/navigation";
import {
  LayoutDashboard,
  Utensils,
  CalendarDays,
  ClipboardList,
  LogOut,
  GalleryVerticalEnd,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/use-auth-store";
import router from "next/dist/shared/lib/router/router";

const navItems = [
  {
    title: "แดชบอร์ด",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "เมนูอาหาร",
    url: "/admin/menus",
    icon: Utensils,
  },
  {
    title: "วันที่พรีออเดอร์",
    url: "/admin/preorder-dates",
    icon: CalendarDays,
  },
  {
    title: "ออเดอร์เมนูอาหาร",
    url: "/admin/orders",
    icon: ClipboardList,
  },
];

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    // คุณอาจต้องการเปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบหลังจากออกจากระบบ
    redirect("auth/login");
  };

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-600 text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4 text-white" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-lg text-indigo-600 dark:text-indigo-400">
                    ลำแต้ๆ อาหารเหนือ
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ระบบจัดการพรีออเดอร์
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  pathname === item.url ||
                  (item.url !== "/admin" &&
                    pathname?.startsWith(`${item.url}`));

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className="h-11 text-base"
                    >
                      <Link href={item.url}>
                        <item.icon className="h-5! w-5!" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="ออกจากระบบ"
              variant="outline"
              onClick={handleLogout}
              className="h-11 text-base text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
            >
              <LogOut className="h-5! w-5!" />
              <span>ออกจากระบบ</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
