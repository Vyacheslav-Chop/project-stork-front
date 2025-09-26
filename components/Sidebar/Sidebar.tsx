"use client";

import Link from "next/link";
import css from "./Sidebar.module.css";
import { logout } from "@/lib/api/apiClient";
import { useRouter } from "next/navigation";
import SidebarNav from "../SidebarNav/SidebarNav";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const isAuth = false;
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/sign-in");
  };

  return (
    <>
      <div
        className={`${css.overlay} ${isOpen ? css.show : ""}`}
        onClick={onClose}
      >
        <div
          className={`${css.sidebar} ${isOpen ? css.open : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={css.header}>
            <Link href="/" className={css.logoBlock}>
              <svg className={css.logoSvg} width={30} height={30}>
                <use href="/icons/icons-header.svg#icon-logo"></use>
              </svg>
              <svg width={62} height={14}>
                <use href="/icons/icons-header.svg#icon-leleka-logo"></use>
              </svg>
            </Link>

            <button className={css.closeBtn} onClick={onClose}>
              <svg width={18} height={19}>
                <use href="/icons/icons-header.svg#icon-close"></use>
              </svg>
            </button>
          </div>

          <SidebarNav isAuth={isAuth} />

          <div className={css.footer}>
            {isAuth ? (
              <button className={css.logoutBtn} onClick={handleLogout}>
                <svg width={40} height={40}>
                  <use href="/icons/iconsSideBar.svg#icon-logout"></use>
                </svg>
              </button>
            ) : (
              <div className={css.authLinks}>
                <Link href="/auth/login" className={css.authLoginBtn}>
                  Увійти
                </Link>
                <Link href="/auth/register" className={css.registerBtn}>
                  Зареєструватися
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
