"use client";

import { createPortal } from "react-dom";
import css from "./AddDiaryEntryModal.module.css";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export const AddDiaryModal = ({ children, onClose }: Props) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Escape") {
          onClose();
        }
      };
  
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }, [onClose]);

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modalWrap}>
        <button className={css.iconWrap} onClick={onClose}>
          <svg className={css.iconClose} width={14} height={14}>
            <use href="/icons/icons-header.svg#icon-close"></use>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default AddDiaryModal;
