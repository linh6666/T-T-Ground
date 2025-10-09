"use client";

import React from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Stack } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import Sun from "./Sun/index";
import { IconArrowLeft } from "@tabler/icons-react";


export default function ControlPage() {
  const router = useRouter();
    const [active, setActive] = useState(false);



  // Danh sách nút và link tương ứng
  const menuItems = [
    { label: "Gia Phúc 1", link: "chi-tiet-dau-tu" },
    // { label: "Gia Phúc 2", link: "" },
    // { label: "Gia Phúc 3", link: "" },
    // { label: "Gia phúc 4", link: "" },
    // { label: "Gia phúc 5", link: "" },

  ];

  return (
    <div className={styles.box}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image
          src="/Logo/logo-tt-city-millennia.png"
          alt="Logo"
          className={styles.imgea}
        />
      </div>

      {/* Tiêu đề */}
      <div className={styles.title}>
        <h1>Phân Khu</h1>
      </div>

      {/* Danh sách nút chuyển trang */}
      <div className={styles.Function}>

      <Stack align="center" style={{ gap: '20px', marginTop: '30px' }}>
          {/* 5 nút đầu (giữ kích thước giống trước) */}
          {menuItems.slice(0, 5).map((item) => (
            <Button
              key={item.link}
              className={styles.menuBtn}     // class cho 5 nút trên
              onClick={() => router.push(item.link)}
              variant="outline"
            >
              {item.label}
            </Button>
          ))}

          {/* 2 nút cuối tách riêng, co giãn theo text */}
          <div className={styles.bottomTwo}>
            {menuItems.slice(5).map((item) => (
              <Button
                key={item.link}
                className={styles.menuBtnSmall}  // class riêng cho 2 nút
                onClick={() => router.push(item.link)}
                variant="outline"
                w="auto"                          // ép Mantine không full width
                style={{ display: "inline-block" }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </Stack>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
         <Group gap="xs">
 {/* <Sun /> */}
 <Button
      onClick={() => setActive((prev) => !prev)}
      variant="filled"
      style={{
        width: 30,
        height: 30,
        padding: 0,
        borderRadius: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        transition: "background 0.3s",
        background: active
          ? "linear-gradient(to top, #FFE09A, #FFF1D2)" // khi click
          : "#FFFAEE",                                   // mặc định
        color: "#752E0B",
        border: "1.5px solid #752E0B",
      }}
    >
      <Group gap={0} align="center">
        <IconArrowLeft
 size={18} color="#752E0B" />
      </Group>
    </Button>
</Group>

      </div>
    </div>
  );
}
