"use client";

import { Field, FieldProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import css from "./AddDiaryEntryForm.module.css";
import { Category } from "@/types/diaries";

interface CustomCheckBoxFormProps {
  name: string;
  emotions: Category[];
}

const CustomCheckBoxForm = ({ name, emotions }: CustomCheckBoxFormProps) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

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
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <Field name={name}>
      {({ field, form }: FieldProps<string[]>) => (
        <div className={css.multiSelectWrapper} ref={selectRef}>
          <div
            className={css.multiSelectTrigger}
            onClick={() => setOpen((prev) => !prev)}
          >
            {field.value.length > 0 ? (
              <div className={css.tags}>
                {field.value.map((id) => {
                  const emo = emotions.find((e) => e._id === id);
                  return (
                    <span key={id} className={css.tag}>
                      {emo?.title}
                    </span>
                  );
                })}
              </div>
            ) : (
              <span className={css.placeholder}>Обрати категорію</span>
            )}
            <svg width={24} height={24} className={css.dateIcon}>
              <use href="/icons/iconsSideBar.svg#keyboard_arrow_down"></use>
            </svg>
          </div>

          {open && (
            <ul className={css.dropdown}>
              {emotions.map((emo) => {
                const checked = field.value.includes(emo._id);

                const handleChange = () => {
                  const updated = new Set(field.value);
                  if (updated.has(emo._id)) {
                    updated.delete(emo._id);
                  } else {
                    updated.add(emo._id);
                  }

                  form.setFieldValue(name, Array.from(updated));
                };

                return (
                  <li key={emo._id} className={css.item}>
                    <label className={css.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleChange}
                      />
                      {emo.title}
                      {/* <svg className="check-icon">
                        <use href="#icon-check"></use>
                      </svg> */}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </Field>
  );
};

export default CustomCheckBoxForm;
