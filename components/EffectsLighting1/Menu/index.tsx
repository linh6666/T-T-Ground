"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apiLighting"; // ✅ Gọi đúng file API bạn gửi

interface MenuProps {
  project_id: string | null;
}

interface MenuItem {
  id: number;
  label: string;
}

export default function Menu({ project_id }: MenuProps) {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // 🧩 Khởi tạo danh sách menu (bỏ loading)
  useEffect(() => {
    setMenuItems([
      { id: 1, label: "Hiệu Ứng 1" },
      { id: 2, label: "Hiệu Ứng 2" },
      { id: 3, label: "Hiệu Ứng 3" },
      { id: 4, label: "Hiệu Ứng 4" },
      { id: 5, label: "Hiệu Ứng 5" },
    ]);
  }, []);

  // 🧭 Quay lại trang điều khiển
  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Dieu-khien-1?id=${project_id}`);
  };

  // 🧠 Khi nhấp nút — gọi API
  const handleClick = async (id: number, label: string) => {
    if (!project_id) {
      console.warn("⚠️ Không có project_id để gọi API.");
      return;
    }

    try {
      const body = { project_id };

      // Gọi API với params, bao gồm id
      const response = await createNodeAttribute(body, {
        type_control: "eff",
        value: 1,
        rs: 0,
        id: id,
      });

      console.log(`✅ Đã gửi hiệu ứng ${label} (ID: ${id})`, response);
    } catch (error) {
      console.error(`❌ Lỗi khi gọi hiệu ứng ${label}:`, error);
    }
  };

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
        <h1>HIỆU ỨNG</h1>
      </div>

      {/* Các nút chức năng */}
      <div className={styles.Function}>
        {menuItems.length > 0 ? (
          <Stack align="center" style={{ gap: "20px", marginTop: "30px" }}>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                id={`menu-btn-${item.id}`}
                className={styles.menuBtn}
                variant="outline"
                onClick={() => handleClick(item.id, item.label)}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        ) : (
          <Text mt="md" c="dimmed">
            Không có dữ liệu hiển thị
          </Text>
        )}
      </div>

      {/* Nút quay lại */}
      <div className={styles.footer}>
        <Group gap="xs">
          <Button
            onClick={handleBack}
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
            <IconArrowLeft size={18} color="#752E0B" />
          </Button>
        </Group>
      </div>
    </div>
  );
}
