"use client";

import { useState } from "react";
import { IconUser } from "@tabler/icons-react";
import { Menu, Text } from "@mantine/core";
import useAuth from "../../../hook/useAuth";
import styles from "./ButtonLogin.module.css";
import Link from "next/link";
import ProfileModal from "./Profile/index"; // ✅ import modal hồ sơ

export default function LoginButton() {
  const { user, isLoggedIn, logout, error } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.alert("Đăng xuất thành công");
    window.location.href = "/";
  };

  return (
    <>
      {isLoggedIn && user ? (
        <Menu shadow="md" width={200} withinPortal>
          <Menu.Target>
            <Text
              style={{ fontSize: "14px", cursor: "pointer" }}
              td="underline"
            >
              {user.full_name}
            </Text>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={() => setIsProfileOpen(true)}>
              Hồ sơ cá nhân
            </Menu.Item>
            <Menu.Item onClick={handleLogout} color="red">
              Đăng xuất
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Link href="/dang-nhap">
          <button type="button" className={styles.userBtn}>
            <IconUser size={14} />{" "}
            <span style={{ fontSize: "12px" }}>Đăng nhập</span>
          </button>
        </Link>
      )}

      {/* ✅ Modal hồ sơ cá nhân */}
      <ProfileModal
        opened={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {error && (
        <div className="text-red-500 text-sm mt-2">
          <p>{error}</p>
        </div>
      )}
    </>
  );
}
