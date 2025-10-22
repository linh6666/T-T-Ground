"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Stack, Loader, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";

interface MenuProps {
  project_id: string | null;
}

interface MenuItem {
  label: string;
}

interface NodeAttributeItem {
  building_type_vi?: string;
  [key: string]: unknown;
}

export default function Menu({ project_id }: MenuProps) {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!project_id) return;

      setLoading(true);
      try {
        const body = {
          project_id,
          filters: [{ label: "group", values: ["ti"] }],
        };

        const data = await createNodeAttribute(body);

        if (data?.data && Array.isArray(data.data)) {
          const allZones: string[] = data.data
            .flatMap((item: NodeAttributeItem) =>
              String(item.building_type_vi || "")
                .split(";")
                .map((z) => z.trim())
                .filter(Boolean)
            );

          const uniqueZones = Array.from(new Set(allZones));

          const sortedZones = uniqueZones.sort((a, b) => {
            const numA = a.match(/\d+/)?.[0];
            const numB = b.match(/\d+/)?.[0];
            if (numA && numB) return Number(numA) - Number(numB);
            return a.localeCompare(b, "vi", { sensitivity: "base" });
          });

          const items: MenuItem[] = sortedZones.map((zone) => ({ label: zone }));
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

  // Điều hướng với building_type_vi
  const handleNavigate = (building_type_vi: string) => {
    if (!project_id) return;
    router.push(`/chi-tiet-tien-ich?id=${project_id}&building_type_vi=${encodeURIComponent(building_type_vi)}`);
  };

  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Dieu-khien?id=${project_id}`);
  };

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
        <h1>TIỆN ÍCH</h1>
      </div>

      <div className={styles.Function}>
        {loading ? (
          <Loader color="orange" />
        ) : menuItems.length > 0 ? (
          <Stack className={styles.scroll} style={{ marginTop: "5px" }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                className={styles.menuBtn}
                onClick={() => handleNavigate(item.label)} // truyền building_type_vi
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
