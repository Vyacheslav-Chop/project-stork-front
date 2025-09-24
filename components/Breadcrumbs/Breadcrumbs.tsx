"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Breadcrumbs.module.css";

type Props = { lastLabel?: string };

const HIDE_ON = [/^\/sign-in(?:\/|$)/, /^\/sign-up(?:\/|$)/, /^\/auth(?:\/|$)/];
const DIARY_ALIASES = ["diary"]; 

const LABELS: Record<string, string> = {
  "": "Лелека",
  "my-day": "Мій день",
  "diary": "Щоденник",
  "journey": "Подорож",
  "profile": "Профіль",
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

function toFirstName(raw?: unknown): string | null {
  if (!raw) return null;
  let s = String(raw).trim();
  if (!s) return null;
  if (s.includes(",")) {
    const parts = s.split(",").map(p => p.trim()).filter(Boolean);
    s = parts.length > 1 ? parts[1] : parts[0];
  }
  if (s.includes("@")) s = s.split("@")[0];
  s = s.replace(/\s+/g, " ");
  const [first] = s.split(" ");
  return first || null;
}

function getUserId(): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; user_id=`);
  if (parts.length === 2) {
    const v = parts.pop()?.split(";").shift();
    if (v) return v;
  }
  try {
    return localStorage.getItem("user_id");
  } catch {
    return null;
  }
}

export default function Breadcrumbs({ lastLabel }: Props) {
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);

  const isHidden = HIDE_ON.some(rx => rx.test(pathname));

  const segs = pathname
    .split("/")
    .filter(Boolean)
    .filter((s: string) => !s.startsWith("@") && !/^\(.+\)$/.test(s));

  const isDiaryDetail = segs.length === 2 && DIARY_ALIASES.includes(segs[0]);
  const isProfilePage = segs.includes("profile");

  useEffect(() => {
    if (isHidden || !API_BASE) return;
    const userId = getUserId();
    if (!userId) { setUserName(null); return; }

    fetch(`${API_BASE}/api/users/${encodeURIComponent(userId)}`, {
      credentials: "include",
      cache: "no-store",
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (!data) { setUserName(null); return; }
        const u = data.data ?? data;
        const first = toFirstName(
          u.givenName ?? u.firstName ?? u.first_name ?? u.name ?? u.Name ?? u.displayName ?? u.username
        );
        setUserName(first);
      })
      .catch(() => setUserName(null));
  }, [pathname, isHidden]);

  const crumbs = [{ href: "/", label: LABELS[""] }];
  segs.forEach((seg: string, i: number) => {
    const href = "/" + segs.slice(0, i + 1).join("/");
    let label = LABELS[seg] ?? decodeURIComponent(seg).replace(/[-_]+/g, " ");
    if (i === segs.length - 1 && lastLabel) label = lastLabel;
    crumbs.push({ href, label });
  });

  if (isHidden) return null;

  return (
    <div className={styles.wrapper}>
      <nav aria-label="Breadcrumb">
        <ol className={styles.list}>
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={c.href} className={styles.item}>
                {i > 0 && <span className={styles.sep} aria-hidden>›</span>}
                {isLast ? (
                  <span className={styles.current} aria-current="page">{c.label}</span>
                ) : (
                  <Link className={styles.link} href={c.href}>{c.label}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {!isDiaryDetail && !isProfilePage && (
        <div className={styles.greeting} suppressHydrationWarning>
          {userName ? `Доброго ранку, ${userName}!` : "Доброго ранку!"}
        </div>
      )}
    </div>
  );
}
