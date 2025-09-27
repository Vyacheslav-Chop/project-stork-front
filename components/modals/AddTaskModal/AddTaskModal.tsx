import css from "./AddTaskModal.module.css";

type Props = {
  children: React.ReactNode;
};

export const AddTaskModal = ({ children }: Props) => {
  return (
    <div className={css.backdrop}>
      <div className={css.modalWrap}>
        <button className={css.iconWrap}>
          <svg className={css.closeIcon} width="24" height="24">
            <use href="/public/icons/close-sideBar.svg"></use>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default AddTaskModal;
