"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import HeaderModal from "../modals/HeaderModal/HeaderModal";
import Sidebar from "../Sidebar/Sidebar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

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

        <button className={styles.burger} onClick={open}>
          <svg width={32} height={32}>
            <use href="/icons/header-icons.svg#icon-burger"></use>
          </svg>
        </button>
      </div>

      <HeaderModal onClose={close} isOpen={isOpen}>
        <Sidebar onClose={close} />
      </HeaderModal>
    </header>
  );
};

export default Header;
