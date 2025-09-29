import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
// import { Metadata } from "next";
import { fetchPrivateWeekDataServer } from "@/lib/api/apiServer";
// import { WeekData } from "@/types/week";
// import JourneyContainer from "../page";
import JourneyDetails from './JourneyDetails.client'
import WeekSelector from '../../../../components/WeekSelector/WeekSelector'
type JourneyPageProps = {
  params: { weekNumber: string };
};

// export async function generateMetadata({
//   params,
// }: JourneyPageProps): Promise<Metadata> {
//   const weekNumber = Number(params.weekNumber);
//   const data: WeekData = await fetchPrivateWeekDataServer();

//   return {
//     title: `Тиждень ${weekNumber}: ${data.weekData.analogy ?? "Ваш малюк"}`,
//     description: data.weekData.babyDevelopment,
//     openGraph: {
//       title: `Тиждень ${weekNumber}: ${data.weekData.analogy ?? "Ваш малюк"}`,
//       description: data.weekData.babyDevelopment,
//       url: `https://beckend-project-stork.onrender.com/journey/${weekNumber}`,  //!
//       images: [
//         {
//           url: "/image/og_profile.webp",
//           width: 1200,
//           height: 630,
//           alt: "Pregnancy journey Tracker",
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `Тиждень ${weekNumber}: ${data.weekData.analogy ?? "Ваш малюк"}`,
//       description: data.weekData.babyDevelopment,
//       images: ["/image/og_profile.webp"],
//     },
//   };
// }

export default async function JourneyPage({ params }: JourneyPageProps) {
  const weekNumber = await Number(params.weekNumber);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["week", weekNumber],
    queryFn: () => fetchPrivateWeekDataServer(params.weekNumber),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeekSelector />
      <JourneyDetails />
    </HydrationBoundary>
  );
}


// 'use client';

// import { useRouter, useParams } from 'next/navigation';
// import toast, { Toaster } from 'react-hot-toast';
// import { useQuery } from '@tanstack/react-query';
// import css from './WeekSeletor.module.css';
// import { fetchCurrentWeek } from '../../lib/api/apiClient'
 
// const TOTAL_WEEKS = 42;

// const WeekSelector = () => {
//   const { weekNumber } = useParams<{ weekNumber: string }>();
//   const selectedWeek = Number(weekNumber);
//   const router = useRouter();

//   const {
//     data: currentWeek,
//     isLoading,
//     // isError,
//   } = useQuery({
//     queryKey: ['currentWeek'],
//     queryFn: fetchCurrentWeek,
//   });

//   const handleWeekClick = (week: number) => {
//     if (!currentWeek) return;

//     if (week > currentWeek) {
//       toast.error(`Тиждень ${week} ще недоступний`);
//       return;
//     }

//     router.push(`/journey/${week}`);
//   };
// const weeks: number[] = [];
//   for (let i = 1; i <= TOTAL_WEEKS; i++) {
//     weeks.push(i);
//   }
//   return (
//     <>
//       <Toaster position="top-right" />
//       <ul className={css.list}>
//         {weeks.map((week) => {
//           const isDisabled = currentWeek !== undefined && week > currentWeek;
//           const isSelected = week === selectedWeek;

//           return (
//             <li key={week} className={css.listItem}>
//               <button
//                 onClick={() => handleWeekClick(week)}
//                 disabled={isLoading || isDisabled}
//                 aria-disabled={isDisabled}
//                 className={`
//                   ${css.button}
//                   ${isSelected ? css.current : ''}
//                   ${isDisabled ? css.disabled : ''}
//                 `}
//                 data-week={week}
//                 data-testid={`week-button-${week}`}
//               >
//                 <span className={css.buttonNumber}>{week}</span>
//                 <p className={css.buttonText}>тиждень</p>
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// };

// export default WeekSelector;


 