"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import styles from "./Header.module.css";
import SideBar from "@/components/Sidebar/Sidebar";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  useEffect(() => {
    if (isDesktop) setIsOpen(false);
  }, [isDesktop]);

  if (isDesktop) return null;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoBlock}>
          <svg className={styles.logoSvg} width={30} height={30}>
            <use href="/icons/header-icons.svg#icon-logo"></use>
          </svg>
          <svg width={62} height={14}>
            <use href="/icons/header-icons.svg#icon-leleka-logo"></use>
          </svg>
        </Link>

        <button
          className={styles.burger}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <svg width={32} height={32}>
            <use href="/icons/header-icons.svg#icon-burger"></use>
          </svg>
        </button>
      </div>

      <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
};

export default Header;
