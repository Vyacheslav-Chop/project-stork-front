"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./FeelingCheckCard.module.css";
import { useAuth } from "@/lib/store/authStore";
import AddDiaryEntryModal from "@/components/modals/AddDiaryEntryModal/AddDiaryEntryModal";

const FeelingCheckCard: React.FC = () => {
  const isLoggedIn = useAuth((state) => state.isAuthenticated);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      router.push("/auth/register");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.textContainer}>
        <h3 className={styles.question}>Як ви себе почуваєте?</h3>
        <div className={styles.recommendation}>
          <span className={styles.recommendationHeading}>
            Рекомендація на сьогодні:
          </span>
          <span className={styles.recommendationText}>
            Занотуйте незвичні відчуття у тілі.
          </span>
        </div>
      </div>
      <button onClick={handleButtonClick} className={styles.button}>
        Зробити запис у щоденник
      </button>

      {isLoggedIn && isModalOpen && (
        // <AddDiaryEntryModal onClose={() => setIsModalOpen(false)} />
        <AddDiaryEntryModal />
      )}
    </div>
  );
};

export default FeelingCheckCard;
