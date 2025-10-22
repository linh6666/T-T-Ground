"use client";

import React from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import Sun from "./Sun";
import { IconArrowLeft } from "@tabler/icons-react";

interface MenuProps {
  project_id: string | null;
}

export default function Menu({ project_id }: MenuProps) {
  const router = useRouter();
  // const [active, setActive] = useState(false);

  // 🧠 Tạo sẵn link kèm project_id (nếu có)
  const menuItems = [
   
      { label: "GIỚI THIỆU DỰ ÁN", link: "/gioi-thieu" },
    { label: "HỆ THỐNG PHÂN KHU", link: `/Phan-khu${project_id ? `?id=${project_id}` : ""}` },
     { label: "HỆ THỐNG TIỆN ÍCH", link: `/tien-ich${project_id ? `?id=${project_id}` : ""}` } ,
    { label: "HIỆU ỨNG ÁNH SÁNG", link: "/hieu-ung-anh-sang" },
    { label: "THƯ VIỆN", link: "/thu-vien" },
    { label: "MÔ HÌNH", link: "/mo-hinh" },
  
  ];


  return (
    <div className={styles.box}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image
            src="/Logo/TTHOMES logo-01.png"
          alt="Logo"
          className={styles.imgea}
        />
      </div>

      {/* Tiêu đề */}
      <div className={styles.title}>
        <h1>MÔ HÌNH TƯƠNG TÁC</h1>
      </div>

      {/* Danh sách nút */}
      <div className={styles.Function}>
        <Stack align="center" style={{ gap: "20px", marginTop: "30px" }}>
          {/* 5 nút đầu */}
          {menuItems.slice(0, 4).map((item) => (
            <Button
              key={item.link}
              className={styles.menuBtn}
              onClick={() => router.push(item.link)}
              variant="outline"
            >
              {item.label}
            </Button>
          ))}

          {/* 2 nút cuối */}
          <div className={styles.bottomTwo}>
            {menuItems.slice(4).map((item) => (
              <Button
                key={item.link}
                className={styles.menuBtnSmall}
                onClick={() => router.push(item.link)}
                variant="outline"
                w="auto"
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
          <Sun />
         <Button
  onClick={() => router.push("/Tuong-tac")} // ← Quay về trang /Tuong-tac
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
    background: "#FFFAEE",
    color: "#752E0B",
    border: "1.5px solid #752E0B",
  }}
>
  <Group gap={0} align="center">
    <IconArrowLeft size={18} color="#752E0B" />
  </Group>
</Button>
        </Group>
      </div>
    </div>
  );
}
