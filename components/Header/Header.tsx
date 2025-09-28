"use client";

import { useState} from "react";
import Link from "next/link";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);



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

      {/* <SideBar onClose={() => setIsOpen(false)} /> */}
    </header>
  );
};

export default Header;
