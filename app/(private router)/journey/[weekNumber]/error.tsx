"use client";

import ErrorText from "@/components/ErrorText/ErrorText";




type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  return (
    <ErrorText message={error.message} />
  );
}
