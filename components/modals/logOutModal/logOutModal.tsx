"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import css from "./logOutModal.module.css";

type LogOutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const LogOutModal = ({ isOpen, onClose, onConfirm }: LogOutModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className={`${css.backdrop} ${isOpen ? css.open : ""}`}
      onClick={handleBackdropClick}
      >
        <div className={css.modalWrap}>
        <button className={css.iconWrap} onClick={onClose}>
            <svg className={css.iconClose} width={14} height={14}>
                <use href="/icons/icons-header.svg#icon-close"></use>
            </svg>
        </button>
        <h2 className={css.modalTitle}>Ви точно хочете вийти?</h2>
        <div className={css.btnBlock}>
          <button className={css.cancelBtn} onClick={onClose}>
            Ні
          </button>
          <button className={css.confirmBtn} onClick={onConfirm}>
            Так
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogOutModal;
