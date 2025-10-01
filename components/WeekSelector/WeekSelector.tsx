'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import css from './WeekSelector.module.css';
import { useAuth } from '../../lib/store/authStore';
import { useEffect, useRef } from 'react';
import { getWeekDynamic } from '@/lib/api/apiClient';
import Loader from '@/components/Loader/Loader';

const TOTAL_WEEKS = 42;

const WeekSelector = () => {
  const params = useParams();
  const selectedWeek = Number(params.weekNumber);

  const currentWeek = useAuth((state) => state.currentWeek);
  const setCurrentWeek = useAuth((state) => state.setCurrentWeek);
  const weekRefs = useRef<(HTMLLIElement | null)[]>([]);


  useEffect(() => {
    const fetchCurrentWeek = async () => {
      try {
        if (currentWeek === null) {
          const weekRes = await getWeekDynamic();
          if (weekRes?.currentWeek) {
            setCurrentWeek(weekRes.currentWeek);
          }
        }
      } catch (error) {
        console.error('Помилка при завантаженні тижня:', error);
      }
    };

    fetchCurrentWeek();
  }, [currentWeek, setCurrentWeek]);

 useEffect(() => {
    const scrollToWeek = selectedWeek ?? currentWeek;
    if (
      typeof scrollToWeek === 'number' &&
      weekRefs.current[scrollToWeek - 1]
    ) {
      weekRefs.current[scrollToWeek - 1]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentWeek, selectedWeek]);
  if (typeof currentWeek !== 'number') {
    return <Loader />;
  }

  const weeks: number[] = [];
  for (let i = 1; i <= TOTAL_WEEKS; i++) {
    weeks.push(i);
  }

  return (
    <>
      <Toaster position="top-right" />
      <ul className={css.list}>
        {weeks.map((week, index) => {
          const isDisabled = week > currentWeek;
          const isSelected = week === selectedWeek;

          return (
             <li
              key={week}
              className={css.listItem}
              ref={(el) => {
                weekRefs.current[index] = el;
              }}
            >
              {isDisabled ? (
                <div
                  className={`${css.button} ${css.disabled}`}
                  aria-disabled="true"
                  data-week={week}
                >
                  <span className={css.buttonNumber}>{week}</span>
                  <p className={css.buttonText}>тиждень</p>
                </div>
              ) : (
                <Link
                  href={`/journey/${week}`}
                  className={`${css.button} ${isSelected ? css.current : ''}`}
                  data-week={week}
                >
                  <span className={css.buttonNumber}>{week}</span>
                  <p className={css.buttonText}>тиждень</p>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default WeekSelector;
