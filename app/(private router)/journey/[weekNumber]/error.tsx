"use client";

import css from "@/components/Error/ErrorText.module.css";

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  return (
    <p className={css.text}>Could not fetch journey details. {error.message}</p>
  );
}
