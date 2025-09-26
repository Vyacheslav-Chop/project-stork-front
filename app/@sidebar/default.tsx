import SideBar from "@/components/Sidebar/Sidebar";

interface SidebarProps {
  onClose: () => void;
}

export default function SidebarPage({ onClose }: SidebarProps) {
  return <SideBar onClose={onClose} />;
}
