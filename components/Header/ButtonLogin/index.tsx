"use client";

import { useState } from "react";
import {  IconUserCircle } from "@tabler/icons-react";
import { Menu, Text } from "@mantine/core";
import useAuth from "../../../hook/useAuth";
// import styles from "./ButtonLogin.module.css";
import Link from "next/link";
import ProfileModal from "./Profile/index"; 
import ButtonsCollection from "../../../common/ButtonsCollection";
import {
 
  useViewportSize,

} from "@mantine/hooks";// ✅ import modal hồ sơ

export default function LoginButton() {
  const { user, isLoggedIn, logout, error } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
   const widthView = useViewportSize().width;

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
          
              <ButtonsCollection
                background
                hover
                leftIcon={<IconUserCircle size={widthView < 600 ? 16 : 24} color="#ffbe00" />}
              >
                
                  <Text w={"100%"} fw={"700"} c={"white"} truncate="end">
                      {user.full_name}
                  </Text>
                
              </ButtonsCollection>
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
        <ButtonsCollection background hover>
                <Link
                  href={"/dang-nhap"}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconUserCircle size={24} style={{ marginRight: 8 }} />
                  Đăng nhập
                </Link>
              </ButtonsCollection>
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
