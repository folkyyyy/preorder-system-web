import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function MenuHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">เมนูอาหาร</h2>
        <p className="text-muted-foreground text-sm mt-1">
          จัดการรายการเมนูอาหารทั้งหมดในระบบ
        </p>
      </div>
      <Link href="/admin/menus/create" className="w-full sm:w-auto">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-full"
          size="lg"
        >
          <Plus size={16} />
          เพิ่มเมนูอาหาร
        </Button>
      </Link>
    </div>
  );
}
