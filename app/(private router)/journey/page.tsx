"use client";

import { useAuth } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Loader from "@/components/Loader/Loader";

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

  if (!currentWeek) {
    return <Loader />;
  }

  return null;
}
