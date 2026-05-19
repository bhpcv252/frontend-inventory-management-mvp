"use client";

import { usePathname } from "next/navigation";

function getTitle(pathname: string): string {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname === "/products/new") return "Add Product";
  if (pathname.includes("/edit")) return "Edit Product";
  if (pathname.startsWith("/products")) return "Products";
  if (pathname === "/settings") return "Settings";
  return "StockFlow";
}

export default function Topbar() {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 flex-shrink-0">
      <h1 className="text-sm font-semibold text-gray-900">{title}</h1>
    </header>
  );
}
