"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import css from "./HeaderModal.module.css";

type HeaderModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
};

const HeaderModal = ({ children, isOpen }: HeaderModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className={`${css.backdrop} ${isOpen ? css.open : ""}`}>
      <div className={css.modalWrap}>{children}</div>
    </div>,
    document.body
  );
};

export default HeaderModal;
