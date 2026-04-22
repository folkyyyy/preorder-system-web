"use client";

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

  // ฟังก์ชันสำหรับหาชื่อหน้าจาก pathname
  const getPageTitle = (path: string | null) => {
    if (!path) return "จัดการข้อมูล";

    // จัดการ path ที่ตรงเป๊ะๆ
    switch (path) {
      case "/admin":
        return "แดชบอร์ด";
      case "/admin/menus":
        return "เมนูอาหาร";
      case "/admin/preorder-dates":
        return "วันที่พรีออเดอร์";
      case "/admin/orders":
        return "ออเดอร์เมนูอาหาร";
    }

    // จัดการ path ย่อยเผื่ออนาคต เช่น /admin/menus/create
    if (path.startsWith("/admin/menus")) return "เมนูอาหาร";
    if (path.startsWith("/admin/preorder-dates")) return "วันที่พรีออเดอร์";
    if (path.startsWith("/admin/orders")) return "ออเดอร์เมนูอาหาร";

    return "จัดการข้อมูล";
  };

  const title = getPageTitle(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/admin">ผู้ดูแลระบบ</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
