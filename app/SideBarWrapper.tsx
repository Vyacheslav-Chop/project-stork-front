"use client";

import css from "./@sidebar/Sidebar.module.css";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function SideBarWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith("/auth") || pathname.startsWith("/profile/edit")) {
    return null;
  }

  return (
    <div className={css.sidebar}>
      <Sidebar />
    </div>
  );
}
