"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { listMenuService } from "@/services/api";
import { MenuItem } from "@/lib/types";
import { Search, Plus, Edit, Trash2, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export default function MenuContainer() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        const data = await listMenuService.getListMenu();
        // Adjust based on your API response structure, assuming it returns an array
        setMenus(Array.isArray(data) ? data : data?.data || []);
      } catch (error) {
        console.error("Failed to fetch menus:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  // Filter and sort menus
  const filteredMenus = menus.filter((menu) => {
    const matchesSearch = menu.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    // Add status filter logic here if backend supports status
    return matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">เมนูอาหาร</h2>
          <p className="text-muted-foreground text-sm mt-1">
            จัดการรายการเมนูอาหารทั้งหมดในระบบ
          </p>
        </div>
        <Link href="/admin/menus/create" className="w-full sm:w-auto">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2 sm:w-full"
            size="lg"
          >
            <Plus size={16} />
            เพิ่มเมนูอาหาร
          </Button>
        </Link>
      </div>

      {/* Filters section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-2 rounded-lg">
        <div className="relative w-full md:max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            placeholder="ค้นหาเมนูอาหาร..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex w-full md:w-auto gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm text-muted-foreground whitespace-nowrap hidden sm:inline-block">
              เรียงตาม :
            </span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-37.5">
                <SelectValue placeholder="ล่าสุด" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">ล่าสุด</SelectItem>
                <SelectItem value="oldest">เก่าสุด</SelectItem>
                <SelectItem value="price-asc">ราคา (ต่ำ-สูง)</SelectItem>
                <SelectItem value="price-desc">ราคา (สูง-ต่ำ)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table section */}
      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-muted/20 flex items-center gap-2">
          <UtensilsCrossed size={20} className="text-muted-foreground" />
          <h3 className="font-semibold text-base">อาหารเหนือ</h3>
          <Badge
            variant="secondary"
            className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-transparent rounded-full px-3 font-normal ml-2"
          >
            {filteredMenus.length} รายการ
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
                    colSpan={5}
                    className="h-32 text-center text-muted-foreground"
                  >
                    กำลังโหลดข้อมูล...
                  </TableCell>
                </TableRow>
              ) : filteredMenus.length === 0 ? (
                <TableRow key="empty">
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-muted-foreground"
                  >
                    ไม่พบข้อมูลเมนูอาหาร
                  </TableCell>
                </TableRow>
              ) : (
                filteredMenus.map((menu, index) => (
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

        {/* Pagination */}
        {/* <div className="p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            แสดง 1-12 จาก 12 รายการ
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Select defaultValue="10">
                <SelectTrigger className="w-25 h-9">
                  <SelectValue placeholder="10 / หน้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 / หน้า</SelectItem>
                  <SelectItem value="20">20 / หน้า</SelectItem>
                  <SelectItem value="50">50 / หน้า</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Pagination className="w-auto mx-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" className="h-9 w-9 p-0" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive className="h-9 w-9 bg-blue-50 text-blue-600 border-blue-200">
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" className="h-9 w-9 p-0" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div> */}
      </div>
    </div>
  );
}
