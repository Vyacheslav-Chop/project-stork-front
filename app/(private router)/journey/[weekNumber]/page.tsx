import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { fetchPrivateWeekDataServer } from "@/lib/api/apiServer";
import { WeekData } from "@/types/week";
import JourneyContainer from "../page";

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
  const weekNumber = Number(params.weekNumber);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["week", weekNumber],
    queryFn: () => fetchPrivateWeekDataServer(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <JourneyContainer initialWeek={weekNumber} /> */}
    </HydrationBoundary>
  );
}
