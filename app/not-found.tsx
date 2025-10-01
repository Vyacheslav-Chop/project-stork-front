import Link from "next/link";
import css from "./not-found.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  description: "404 Not Found — The requested page could not be found.",
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link className={css.linkBack} href="/">
        &#8592; Go back
      </Link>
    </>
  );
}
