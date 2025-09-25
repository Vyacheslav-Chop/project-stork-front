import css from "./ErrorText.module.css";

interface ErrorTextProps {
  message: string;
}

export default function ErrorText({ message }: ErrorTextProps) {
  return <p className={css.text}>{message}</p>;
}
