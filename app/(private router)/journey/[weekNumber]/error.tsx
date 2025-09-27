"use client";

import ErrorText from "@/components/ErrorText/ErrorText";

// import css from "@/components/Error/ErrorText.module.css";

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  return (
    <ErrorText message={error.message} />
  );
}
