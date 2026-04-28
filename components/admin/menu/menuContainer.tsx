"use client";

import React, { useEffect, useState } from "react";
import { listMenuService } from "@/services/api";
import { MenuItem } from "@/lib/types";
import { MenuHeader } from "./menu-header";
import { MenuFilters } from "./menu-filters";
import { MenuTable } from "./menu-table";

export default function MenuContainer() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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
      <MenuHeader />
      
      <MenuFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <MenuTable menus={filteredMenus} loading={loading} />
    </div>
  );
}
