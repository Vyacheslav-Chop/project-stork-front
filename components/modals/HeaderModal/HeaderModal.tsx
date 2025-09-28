import { createPortal } from "react-dom";
import css from "./HeaderModal.module.css";

type HeaderModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
};

const HeaderModal = ({ children, isOpen }: HeaderModalProps) => {
  return createPortal(
    <div className={`${css.backdrop} ${isOpen ? css.open : ""}`}>
      <div className={css.modalWrap}>{children}</div>
    </div>,
    document.body
  );
};

export default HeaderModal;
