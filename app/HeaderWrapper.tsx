"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";

export default function HeaderWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) return null;

  return <Header />;
}
