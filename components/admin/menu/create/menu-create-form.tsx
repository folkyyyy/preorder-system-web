import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from "lucide-react";
import { ImageUploadField } from "./image-upload-field";

export function MenuCreateForm() {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-6 sm:p-8">
      <div className="flex flex-col gap-8">
        <ImageUploadField />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            ชื่อเมนูอาหาร <span className="text-red-500">*</span>
          </label>
          <Input placeholder="เช่น ข้าวซอยไก่" className="h-11" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            ราคา (บาท) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
              ฿
            </span>
            <Input type="number" placeholder="0.00" className="pl-9 h-11" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">เมนูแบบพิเศษ</label>
          
          <div className="flex items-start gap-3 mt-1">
            <Checkbox id="special-option" className="mt-0.5 rounded-sm" />
            <div className="flex flex-col gap-1">
              <label htmlFor="special-option" className="text-sm font-medium cursor-pointer">
                มีแบบพิเศษ (เพิ่มราคา +10 บาท)
              </label>
              <p className="text-xs text-muted-foreground">
                ลูกค้าเลือกแบบพิเศษได้ และระบบจะบวกเพิ่มจากราคาปกติ 10 บาท
              </p>
            </div>
          </div>

          <div className="bg-[#F8F9FF] border border-[#E5E9F5] rounded-xl p-4 mt-2">
            <div className="flex items-center gap-2 text-blue-600 mb-3">
              <Info size={16} />
              <span className="font-semibold text-sm">หมายเหตุ</span>
            </div>
            <ul className="text-sm text-blue-700/80 space-y-1.5 list-disc pl-6">
              <li>ราคาพิเศษจะเพิ่มจากราคาปกติ 10 บาท</li>
              <li>ระบบจะแสดงตัวเลือก "แบบพิเศษ" ให้ลูกค้าเลือกตอนสั่งซื้อ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
