"use client";

import WeekSelector from "../../../components/WeekSelector/WeekSelector";
import JourneyDetails from "./[weekNumber]/JourneyDetails.client";
import { useState } from "react";


interface JourneyContainerProps {
  initialWeek: number;
}


export default function JourneyContainer({ initialWeek }: JourneyContainerProps) {
  const [selectedWeek, setSelectedWeek] = useState<number>(initialWeek);

  return (
    <div>
      <WeekSelector
        currentWeek={initialWeek} 
        selectedWeek={selectedWeek}
        onSelectWeek={setSelectedWeek}
      />
      <JourneyDetails weekNumber={selectedWeek} />
    </div>
  );
}


/*
interface WeekSelectorProps {
  currentWeek: number;
  selectedWeek: number;
  onSelectWeek: (week: number) => void;
} для WeekSelecotr 

interface JourneyDetailsClientProps {
  weekNumber: number;
} дляJourneyDetails
*/ 