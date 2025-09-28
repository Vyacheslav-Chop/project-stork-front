"use client";

import css from "./AddTaskModal.module.css";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export const AddTaskModal = ({ children, onClose }: Props) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modalWrap}>
        <button className={css.iconWrap} onClick={onClose}>
          <svg className={css.iconClose} width={14} height={14}>
            <use href="/icons/icons-header.svg#icon-close"></use>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default AddTaskModal;
