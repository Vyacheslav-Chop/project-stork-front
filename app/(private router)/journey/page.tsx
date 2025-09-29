"use client";

import { useAuth } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

export default function JourneyContainer() {
  const { currentWeek } = useAuth();
  const router = useRouter()
  router.push(`/journey/${currentWeek}`)
}
