import css from "./page.module.css";
import { Metadata } from "next";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/ProfileEditForm/ProfileEditForm";
import { getUserServer } from "@/lib/api/apiServer";

export const metadata: Metadata = {
  title: "Ваш профіль — Лелека",
  description:
    "Керуйте своїм профілем, налаштуваннями та особистими даними на шляху до материнства.",
  openGraph: {
    title: "Ваш профіль — Лелека",
    description:
      "Налаштовуйте профіль і зберігайте важливу інформацію для своєї подорожі до материнства.",
    siteName: "Лелека",
    images: [
      {
        url: "/image/profile/og_profile.webp",
        width: 1200,
        height: 630,
        alt: "Сторінка профілю користувачки у Лелека",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ваш профіль — Лелека",
    description: "Доступ до вашого профілю та налаштувань у Лелека.",
    images: ["/image/profile/og_profile.webp"],
  },
};

const Profile = async () => {
  const res = await getUserServer();
  const user = res?.data ?? null;

  if (!user) return;

  return (
    <div className={css.profileCard}>
      <ProfileAvatar user={user} />
      <ProfileEditForm user={user} />
    </div>
  );
};

export default Profile;
