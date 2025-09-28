"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import css from "./HeaderModal.module.css";

type HeaderModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const HeaderModal = ({ children, isOpen, onClose }: HeaderModalProps) => {
  const [mounted, setMounted] = useState(false);
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

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className={`${css.backdrop} ${isOpen ? css.open : ""}`} onClick={handleBackdropClick}>
      <div className={css.modalWrap}>{children}</div>
    </div>,
    document.body
  );
};

export default HeaderModal;
