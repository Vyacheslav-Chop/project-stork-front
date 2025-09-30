
 'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import css from './WeekSelector.module.css';
import { useAuth } from '../../lib/store/authStore';

const TOTAL_WEEKS = 42;

const WeekSelector = () => {
  const params = useParams();
  const selectedWeek = Number(params.weekNumber);
  const { currentWeek } = useAuth();

  
  const weeks: number[] = [];
  for (let i = 1; i <= TOTAL_WEEKS; i++) {
    weeks.push(i);
  }
  return (
    <>
      <Toaster position="top-right" />

      <ul className={css.list}>
        {weeks.map((week) => {
          const isDisabled = currentWeek !== null && week > currentWeek;

          const isSelected = week === selectedWeek;

          return (
            <li key={week} className={css.listItem}>
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
}
export default WeekSelector;
