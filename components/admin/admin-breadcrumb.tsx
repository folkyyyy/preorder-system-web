"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function AdminBreadcrumb() {
  const pathname = usePathname();

  const getBreadcrumbItems = (path: string | null) => {
    if (!path) return [{ title: "จัดการข้อมูล", href: "" }];

    const items = [];

    if (path === "/admin") {
      items.push({ title: "แดชบอร์ด", href: "" });
    } else if (path.startsWith("/admin/menus")) {
      if (path === "/admin/menus") {
        items.push({ title: "เมนูอาหาร", href: "" });
      } else if (path === "/admin/menus/create") {
        items.push({ title: "เมนูอาหาร", href: "/admin/menus" });
        items.push({ title: "สร้างเมนูใหม่", href: "" });
      } else {
        items.push({ title: "เมนูอาหาร", href: "/admin/menus" });
      }
    } else if (path.startsWith("/admin/preorder-dates")) {
      items.push({ title: "วันที่พรีออเดอร์", href: "" });
    } else if (path.startsWith("/admin/orders")) {
      items.push({ title: "ออเดอร์เมนูอาหาร", href: "" });
    } else {
      items.push({ title: "จัดการข้อมูล", href: "" });
    }

    return items;
  };

  const items = getBreadcrumbItems(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/admin">ผู้ดูแลระบบ</BreadcrumbLink>
        </BreadcrumbItem>
        {items.length > 0 && (
          <BreadcrumbSeparator className="hidden md:block" />
        )}
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

