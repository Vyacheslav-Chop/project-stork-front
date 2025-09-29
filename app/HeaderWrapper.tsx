"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith("/auth") || pathname.startsWith("/profile/edit")) {
    return null;
  }

  return <Header />;
}
