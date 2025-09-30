"use client";

import css from "./OnboardingAvatar.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
import Loader from "../Loader/Loader";
import ErrorText from "../ErrorText/ErrorText";
import { useAuth } from "@/lib/store/authStore";
import { UserResponse } from "@/types/user";
import { updateUserAvatar } from "@/lib/api/apiClient";

type ProfileProps = {
  user?: UserResponse
}

const OnboardingFormAvatar = ({user}: ProfileProps) => {
  const setUser = useAuth((state) => state.setUser);
  const [avatar, setAvatar] = useState<string | null>(user?.avatar ?? null);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
    

  const handleClickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    fileInputRef.current?.click();
    e.currentTarget.blur();
    };
    
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setErr("");

    if (file) {
      if (!file.type.startsWith("image/")) {
        setErr("Тільки зображення");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErr("Файл занадто великий. Максимум 5 МБ.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = async () => {
        const localPreview = reader.result as string;
        setAvatar(localPreview);
        setIsLoading(true);
        try {
          const updatedUser = await updateUserAvatar(file);
          setUser(updatedUser);
          setAvatar(localPreview);
        } catch {
          setErr("Не вдалось завантажити фото");
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={css.wrap}>
      <div className={css.avatarWrapper}>
        <Image
          src={avatar ?? "/image/profile/default_avatar.webp"}
          alt="User Avatar"
          width={164}
          height={164}
          className={css.avatar}
        />
      </div>
        <button
          className={css.uploadBtn}
          onClick={(e) => handleClickBtn(e)}
          disabled={isLoading}
        >
          Завантажити фото
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className={css.input}
        />
          {err && <ErrorText message="Не вдалось завантажити фото!"
          />}
       
      
      {isLoading && (
        <Loader
          size={60}
          thickness={6}
          color="#ffb385"
          borderColor="rgba(255, 179, 133, 0.3)"
          shadowColor="rgba(255, 179, 133, 0.5)"
          innerSize={50}
          innerThickness={4}
          innerColor="#ffe5d1"
          innerBorderColor="rgba(255, 229, 209, 0.2)"
        />
      )}
    </div>
  );
};

export default OnboardingFormAvatar;
