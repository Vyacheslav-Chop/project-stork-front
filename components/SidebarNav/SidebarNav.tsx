import css from "./SidebarNav.module.css";
import Link from "next/link";

interface SidebarNavProps {
  isAuth: boolean;
}

const SidebarNav = ({ isAuth }: SidebarNavProps) => {
  return (
    <nav>
      <ul className={css.navList}>
        <li>
          <Link href={isAuth ? "/" : "/auth/register"} className={css.navItem}>
            <svg width={24} height={24}>
              <use href="/icons/iconsSideBar.svg#icon-myDay"></use>
            </svg>
            Мій день
          </Link>
        </li>
        <li>
          <Link href={isAuth ? "/" : "/auth/register"} className={css.navItem}>
            <svg width={24} height={24}>
              <use href="/icons/iconsSideBar.svg#icon-travel"></use>
            </svg>
            Подорож
          </Link>
        </li>
        <li>
          <Link
            href={isAuth ? "/diary" : "/auth/register"}
            className={css.navItem}
          >
            <svg width={24} height={24}>
              <use href="/icons/iconsSideBar.svg#icon-book"></use>
            </svg>
            Щоденник
          </Link>
        </li>
        <li>
          <Link href={isAuth ? "/" : "/auth/register"} className={css.navItem}>
            <svg width={24} height={24}>
              <use href="/icons/iconsSideBar.svg#icon-account"></use>
            </svg>
            Профіль
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default SidebarNav;
