"use client";

import { usePathname } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

export default function BreadcrumbsWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith("/auth") || pathname.startsWith("/profile/edit")) {
    return null;
  }

  return (
    <div>
      <Breadcrumbs />
    </div>
  );
}
