"use client";

import { useAuth } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

export default function JourneyContainer() {
  const { currentWeek } = useAuth();
  const router = useRouter()
  router.push(`/journey/${currentWeek}`)
}


// 'use client';

// import WeekSelector from '@/components/WeekSelector/WeekSelector';
// import JourneyDetail from '@/app/(private router)/journey/[weekNumber]/JourneyDetails.client';


// export default function JourneyPage() {
//   return (
//     <div>
//         <WeekSelector />
//         <JourneyDetail /> 
//     </div>
//   );
// }
