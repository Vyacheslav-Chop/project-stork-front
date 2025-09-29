"use client";

import { useAuth } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function JourneyContainer() {
  const { currentWeek } = useAuth();
  const router = useRouter();
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (currentWeek && !hasNavigated.current) {
      router.push(`/journey/${currentWeek}`);
      hasNavigated.current = true;
    }
  }, [currentWeek, router]);

  return null;
}
