"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Stack, Loader, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";

// Kiểu prop nhận vào
interface MenuProps {
  project_id: string | null;
}

// Kiểu dữ liệu item trong menu
interface MenuItem {
  label: string;
}

// Kiểu dữ liệu trả về từ API createNodeAttribute
interface NodeAttributeItem {
  phase_vi?: string;
  [key: string]: unknown;
}

export default function Menu({ project_id }: MenuProps) {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  // ✅ trạng thái active cho ON/OFF

  useEffect(() => {
    const fetchData = async () => {
      if (!project_id) return;

      setLoading(true);
      try {
        const body = {
          project_id,
          filters: [{ label: "group", values: ["ct"] }],
        };

        const data = await createNodeAttribute(body);

        if (data?.data && Array.isArray(data.data)) {
          // Tách phase_vi và loại trùng
          const allPhases: string[] = data.data.flatMap(
            (item: NodeAttributeItem) =>
              String(item.phase_vi || "")
                .split(";")
                .map((z) => z.trim())
                .filter(Boolean)
          );

          const uniquePhases = Array.from(new Set(allPhases));

          // Sắp xếp
          const sortedPhases = uniquePhases.sort((a, b) => {
            const numA = a.match(/\d+/)?.[0];
            const numB = b.match(/\d+/)?.[0];
            if (numA && numB) return Number(numA) - Number(numB);
            return a.localeCompare(b, "vi", { sensitivity: "base" });
          });

          // Chỉ giữ label
          const items: MenuItem[] = sortedPhases.map((phase) => ({
            label: phase,
          }));
          setMenuItems(items);
        } else {
          console.warn("⚠️ Dữ liệu trả về không đúng định dạng:", data);
        }
      } catch (error) {
        console.error("❌ Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [project_id]);

  // Điều hướng với phase_vi
  const handleNavigate = (phase: string) => {
    if (!project_id) return;
    router.push(
      `/chi-tiet?id=${project_id}&phase=${encodeURIComponent(phase)}`
    );
  };

  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Dieu-khien?id=${project_id}`);
  };

  // ✅ Hàm tạo style cho nút ON/OFF
  // const getButtonStyle = (isActive: boolean) => ({
  //   width: 30,
  //   height: 30,
  //   padding: 0,
  //   borderRadius: 40,
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   overflow: "hidden",
  //   transition: "background 0.3s",
  //   background: isActive ? "linear-gradient(to top, #FFE09A,#FFF1D2)" : "#FFFAEE",
  //   color: isActive ? "#752E0B" : "#752E0B",
  //   border: "1.5px solid #752E0B",
  // });

  return (
    <div className={styles.box}>
      <div className={styles.logo}>
        <Image
          src="/Logo/logo-tt-city-millennia.png"
          alt="Logo"
          className={styles.imgea}
        />
      </div>

      <div className={styles.title}>
        <h1>PHÂN KHU</h1>
      </div>

      <div className={styles.Function}>
        {loading ? (
          <Loader color="orange" />
        ) : menuItems.length > 0 ? (
          <Stack align="center" style={{ gap: "20px", marginTop: "30px" }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                className={styles.menuBtn}
                onClick={() => handleNavigate(item.label)}
                variant="outline"
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

      {/* ✅ Footer có ON/OFF có trạng thái */}
      <div className={styles.footer}>
        <Group gap="xs">
          {/* Nút ON */}

          {/* Nút quay lại */}
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
