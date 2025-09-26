"use client";
import { useEffect } from "react";
import styles from "./ConfirmationModal.module.css";

interface ConfirmationModalProps {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const ConfirmationModal = ({
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  isOpen
}: ConfirmationModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.buttons}>
            <button type="button"
              className={styles.cancelButton}
              onClick={onCancel}
            >
              {cancelButtonText}
            </button>
            <button type="button"
              className={styles.confirmButton}
              onClick={onConfirm}
            >
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;