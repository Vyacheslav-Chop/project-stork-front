import { useEffect, useState, useRef } from "react";
import { FieldProps } from "formik";
import css from "./ProfileEditForm.module.css";

export default function CustomSelect({ field, form }: FieldProps) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const handleSelect = (value: string) => {
    form.setFieldValue(field.name, value);
    setOpen(false);
  };

  const selected = field.value || "Оберіть стать дитини";

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : originalOverflow;

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <div className={css.selectWrap} ref={selectRef}>
      <div
        className={`${css.formSelect} ${open ? css.open : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        {selected}
        <svg width={24} height={24} className={css.selectIcon}>
          <use href="/icons/iconsSideBar.svg#keyboard_arrow_down"></use>
        </svg>
      </div>

      {open && (
        <ul className={css.dropdown}>
          <li
            className={`${css.option} ${css.disabled}`}
            onClick={(e) => e.preventDefault()}
          >
            Оберіть стать дитини
          </li>
          <li className={css.option} onClick={() => handleSelect("Хлопчик")}>
            Хлопчик
          </li>
          <li className={css.option} onClick={() => handleSelect("Дівчинка")}>
            Дівчинка
          </li>
          <li className={css.option} onClick={() => handleSelect("Ще не знаю")}>
            Ще не знаю
          </li>
        </ul>
      )}
    </div>
  );
}
