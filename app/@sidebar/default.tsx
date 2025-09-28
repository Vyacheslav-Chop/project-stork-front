import SideBar from "@/components/Sidebar/Sidebar";
import css from './Sidebar.module.css'

export default function SidebarPage() {
  return (
    <div className={css.sidebar}>
      <SideBar />
    </div>
  );
}
