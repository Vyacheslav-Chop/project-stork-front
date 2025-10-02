"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Breadcrumbs.module.css";
import { getUser } from "@/lib/api/apiClient";
import Loader from "../Loader/Loader";

type Props = { lastLabel?: string };

const HIDE_ON = [/^\/sign-in(?:\/|$)/, /^\/sign-up(?:\/|$)/, /^\/auth(?:\/|$)/];

const LABELS: Record<string, string> = {
  "": "Лелека",
  myday: "Мій день",
  diary: "Щоденник",
  journey: "Подорож",
  profile: "Профіль",
};

function toFirstName(raw?: unknown): string | null {
  if (!raw) return null;
  let s = String(raw).trim();
  if (!s) return null;
  if (s.includes(",")) {
    const parts = s
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    s = parts.length > 1 ? parts[1] : parts[0];
  }
  if (s.includes("@")) s = s.split("@")[0];
  s = s.replace(/\s+/g, " ");
  const [first] = s.split(" ");
  return first || null;
}

export default function Breadcrumbs({ lastLabel }: Props) {
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isHidden = HIDE_ON.some((rx) => rx.test(pathname));

  const segs = pathname
    .split("/")
    .filter(Boolean)
    .filter((s: string) => !s.startsWith("@") && !/^\(.+\)$/.test(s));

  useEffect(() => {
    if (isHidden) return;
    let mounted = true;
    setIsLoading(true);
    getUser()
      .then((resp) => {
        if (!mounted) return;
        setUserName(toFirstName(resp?.name));
      })
      .catch(() => {
        if (!mounted) return;
        setUserName(null);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [pathname, isHidden]);

  if (isHidden) return null;
  if (isLoading) return <Loader />;

  const crumbs: { href: string; label: string }[] = [
    { href: "/", label: LABELS[""] },
  ];

  if (pathname === "/" && lastLabel) {
    crumbs.push({ href: "/", label: lastLabel });
  } else {
    segs.forEach((seg, i) => {
      const href = "/" + segs.slice(0, i + 1).join("/");
      let label = LABELS[seg] ?? decodeURIComponent(seg).replace(/[-_]+/g, " ");
      if (i === segs.length - 1 && lastLabel) {
        label = lastLabel;
      }
      crumbs.push({ href, label });
    });
  }

  return (
    <div className={styles.wrapper}>
      <nav aria-label="Breadcrumb">
        <ol className={styles.list}>
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={i} className={styles.item}>
                {i > 0 && (
                  <svg width={8} height={12}>
                    <use href="/icons/icon-arrow.svg#"></use>
                  </svg>
                )}
                {isLast ? (
                  <span className={styles.current} aria-current="page">
                    {c.label}
                  </span>
                ) : (
                  <Link className={styles.link} href={c.href}>
                    {c.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
