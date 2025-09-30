import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { getBabyStateServer, getMomStateServer } from "@/lib/api/apiServer";
import JourneyDetails from './JourneyDetails.client'
import WeekSelector from '../../../../components/WeekSelector/WeekSelector'

type JourneyPageProps = {
  params: Promise<{ weekNumber: string }>;
};


export async function generateMetadata({ params }: JourneyPageProps): Promise<Metadata> {
  const { weekNumber } = await params;  

const weekNum = Number(weekNumber);

  const [baby, mom] = await Promise.all([
    getBabyStateServer(weekNum),
    getMomStateServer(weekNum),
  ]);

  if (!baby && !mom) {
    return {
      title: "Тиждень не знайдено",
      description: "Дані для цього тижня відсутні",
    };
  }

  const title = `Тиждень ${weekNum}: ${baby?.analogy ?? "Ваш малюк"}`;

  const description =
    baby?.babyDevelopment ??
    baby?.interestingFact ??
    mom?.feelings.sensationDescr ??
    "Дані про розвиток малюка та зміни в тілі мами.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://твій-домен/journey/${weekNum}`,
      images: [
        {
          url: "/image/journey_week.webp",
          width: 1200,
          height: 630,
          alt: "Pregnancy journey Tracker",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/image/journey_week.webp"],
    },
  };
}



export default async function JourneyPage({ params }: JourneyPageProps) {
  const { weekNumber } = await params;
  const weekNum = Number(weekNumber); 
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["journeyDetails", weekNum, "baby"],
    queryFn: () => getBabyStateServer(weekNum),
  });

   await queryClient.prefetchQuery({
     queryKey: ["journeyDetails", weekNum, "mom"],
     queryFn: () => getMomStateServer(weekNum),
   });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeekSelector />
      <JourneyDetails />
    </HydrationBoundary>
  );
}


