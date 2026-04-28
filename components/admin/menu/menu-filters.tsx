import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface MenuFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export function MenuFilters({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
}: MenuFiltersProps) {
  return (
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
  );
}
