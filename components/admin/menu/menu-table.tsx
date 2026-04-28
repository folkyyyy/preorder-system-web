import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, UtensilsCrossed } from "lucide-react";
import { MenuItem } from "@/lib/types";

interface MenuTableProps {
  menus: MenuItem[];
  loading: boolean;
}

export function MenuTable({ menus, loading }: MenuTableProps) {
  return (
    <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-muted/20 flex items-center gap-2">
        <UtensilsCrossed size={20} className="text-muted-foreground" />
        <h3 className="font-semibold text-base">อาหารเหนือ</h3>
        <Badge
          variant="secondary"
          className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-transparent rounded-full px-3 font-normal ml-2"
        >
          {menus.length} รายการ
        </Badge>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-37.5 text-center">ลำดับ</TableHead>
              <TableHead>เมนูอาหาร</TableHead>
              <TableHead className="w-40 text-center">ราคา (บาท)</TableHead>
              <TableHead className="w-37.5 text-center">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow key="loading">
                <TableCell
                  colSpan={4}
                  className="h-32 text-center text-muted-foreground"
                >
                  กำลังโหลดข้อมูล...
                </TableCell>
              </TableRow>
            ) : menus.length === 0 ? (
              <TableRow key="empty">
                <TableCell
                  colSpan={4}
                  className="h-32 text-center text-muted-foreground"
                >
                  ไม่พบข้อมูลเมนูอาหาร
                </TableCell>
              </TableRow>
            ) : (
              menus.map((menu, index) => (
                <TableRow key={menu.id || `menu-${index}`}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-md overflow-hidden bg-muted relative shrink-0">
                        {menu.image_url ? (
                          <img
                            src={menu.image_url}
                            alt={menu.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <UtensilsCrossed
                              size={20}
                              className="text-gray-400"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-base">
                          {menu.name}
                        </span>
                        {menu.description && (
                          <span className="text-sm text-muted-foreground line-clamp-1">
                            {menu.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <span className="font-medium text-slate-700">
                        ฿{menu.price.toFixed(2)}
                      </span>
                      {menu.isSpecialAllowed ? (
                        <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200/50 hover:bg-emerald-100 font-normal px-2 py-0 h-5 text-[11px]">
                          พิเศษ ฿{menu.specialPrice?.toFixed(2)}
                        </Badge>
                      ) : (
                        <Badge className="bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 font-normal px-2 py-0 h-5 text-[11px]">
                          ไม่มีราคาพิเศษ
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
