'use client';

import { useRouter, useParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import css from './WeekSelector.module.css';
import { fetchCurrentWeek } from '../../lib/api/apiClient'
 
const TOTAL_WEEKS = 42;

const WeekSelector = () => {
  const { curre } = useParams<{ weekNumber: string }>();
  const selectedWeek = Number(weekNumber);
  const router = useRouter();

  const {
    data: currentWeek,
    isLoading,
    // isError,
  } = useQuery({
    queryKey: ['currentWeek'],
    queryFn: fetchCurrentWeek,
  });

  const handleWeekClick = (week: number) => {
    if (!currentWeek) return;

    if (week > currentWeek && week > selectedWeek) {
      toast.error(`Тиждень ${week} ще недоступний`);
      return;
    }

    router.push(`/journey/${week}`);
  };
const weeks: number[] = [];
  for (let i = 1; i <= TOTAL_WEEKS; i++) {
    weeks.push(i);
  }
  return (
    <>
      <Toaster position="top-right" />
      <ul className={css.list}>
        {weeks.map((week) => {
          const isDisabled = currentWeek !== undefined && week > currentWeek;
          const isSelected = week === selectedWeek;

          return (
            <li key={week} className={css.listItem}>
              <button
                onClick={() => handleWeekClick(week)}
                disabled={isLoading || isDisabled}
                aria-disabled={isDisabled}
                className={`
                  ${css.button}
                  ${isSelected ? css.current : ''}
                  ${isDisabled ? css.disabled : ''}
                `}
                data-week={week}
                data-testid={`week-button-${week}`}
              >
                <div className={css.btnText}>
                  <p className={css.buttonNumber}>{week}</p>
                <p className={css.buttonText}>тиждень</p>
                </div>
                
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default WeekSelector;


 