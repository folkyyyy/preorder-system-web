import React from "react";
import { ImagePlus, Info } from "lucide-react";

export function ImageUploadField() {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">
        รูปภาพเมนูอาหาร <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Upload Area */}
        <div className="flex-1 border-2 border-dashed border-indigo-200 rounded-xl bg-white p-8 flex flex-col items-center justify-center hover:bg-indigo-50/50 transition-colors cursor-pointer text-center min-h-[200px]">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <ImagePlus size={28} />
          </div>
          <span className="text-indigo-600 font-semibold mb-1">อัปโหลดรูปภาพ</span>
          <span className="text-muted-foreground text-xs">
            รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB
          </span>
        </div>

        {/* Hint Box */}
        <div className="flex-1 bg-[#F8F9FA] rounded-xl p-6 border border-transparent">
          <div className="flex items-center gap-2 text-blue-600 mb-4">
            <Info size={18} />
            <span className="font-semibold text-sm">คำแนะนำ</span>
          </div>
          <ul className="text-sm text-slate-600 space-y-2.5 list-disc pl-5">
            <li>ใช้ภาพที่ชัดเจน สว่าง และดูน่ารับประทาน</li>
            <li>ขนาดแนะนำ 800 x 800 px (อัตราส่วน 1:1)</li>
            <li>ไฟล์ขนาดไม่เกิน 5MB</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
