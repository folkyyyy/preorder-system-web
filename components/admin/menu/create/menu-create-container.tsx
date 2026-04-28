import React from "react";
import { Button } from "@/components/ui/button";
import { MenuCreateHeader } from "./menu-create-header";
import { MenuCreateForm } from "./menu-create-form";
import Link from "next/link";

export function MenuCreateContainer() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <MenuCreateHeader />
      
      <MenuCreateForm />

      <div className="flex justify-end gap-4 mt-2">
        <Link href="/admin/menus">
          <Button variant="outline" size="lg" className="px-8 font-medium h-11">
            ยกเลิก
          </Button>
        </Link>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 font-medium h-11 min-w-[120px]">
          บันทึก
        </Button>
      </div>
    </div>
  );
}
