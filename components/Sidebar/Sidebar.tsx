"use client";

import { useState } from "react";
import Link from "next/link";
import css from "./Sidebar.module.css";
import SidebarNav from "../SidebarNav/SidebarNav";
import { useAuth } from "@/lib/store/authStore";
import Image from "next/image";
import LogoutModal from "../modals/logOutModal/logOutModal";
import { logout } from "@/lib/api/apiClient";
import { useRouter } from "next/navigation";
import Loader from "../Loader/Loader";

type Props = {
  onClose?: () => void;
};

const Sidebar = ({ onClose }: Props) => {
  const { user, isAuthenticated } = useAuth();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openLogout = () => setIsLogoutOpen(true);
  const closeLogout = () => setIsLogoutOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      closeLogout();
      router.replace("/auth/login");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.sidebar}>
      {loading && <Loader />}
      <div className={css.header}>
        <Link href="/" className={css.logoBlock}>
          <svg className={css.logoSvg} width={30} height={30}>
            <use href="/icons/header-icons.svg#icon-logo"></use>
          </svg>
          <svg width={62} height={14}>
            <use href="/icons/header-icons.svg#icon-leleka-logo"></use>
          </svg>
        </Link>

        {onClose && (
          <button className={css.closeBtn} onClick={onClose}>
            <svg width={18} height={19}>
              <use href="/icons/icons-header.svg#icon-close"></use>
            </svg>
          </button>
        )}
      </div>

      <div className={css.inner}>
        <SidebarNav isAuth={isAuthenticated} />
      </div>
      <div className={css.footerLine}></div>
      <div className={css.footer}>
        {isAuthenticated ? (
          <div className={css.authLinks}>
            <div className={css.infoWrap}>
              <div className={css.avatarWrapper}>
                <Image
                  src={user?.avatar ?? "/image/profile/default_avatar.webp"}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className={css.avatar}
                />
              </div>
              <div className={css.profileInfo}>
                <p className={css.textName}>{user?.name}</p>
                <p className={css.textEmail}>{user?.email}</p>
              </div>
            </div>
            <button className={css.logoutBtn} onClick={openLogout}>
              <svg width={40} height={40}>
                <use href="/icons/iconsSideBar.svg#icon-logout"></use>
              </svg>
            </button>
          </div>
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

      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={closeLogout}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
