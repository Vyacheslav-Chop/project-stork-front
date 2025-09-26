"use client";

import Link from "next/link";
import css from "./Sidebar.module.css";
import { logout } from "@/lib/api/apiClient";
import { useRouter } from "next/navigation";
import SidebarNav from "../SidebarNav/SidebarNav";

interface SidebarProps {
  onClose: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const isAuth = false;
  const rouret = useRouter();

  const handleLogout = async () => {
    await logout();
    rouret.replace("/sign-in");
  };

  return (
    <div className={css.sidebar}>
      <div className={css.header}>
        <Link href="/">
          <svg className={css.iconStork} width={30} height={31}>
            <use href="/icons/iconsSideBar.svg#icon-stork"></use>
          </svg>
          <span className={css.logoText}>Лелека</span>
        </Link>

        <button className={css.closeBtn} onClick={onClose}>
          <svg width={32} height={32}>
            <use href="/icons/iconsSideBar.svg#icon-close"></use>
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
  );
};

export default Sidebar;
