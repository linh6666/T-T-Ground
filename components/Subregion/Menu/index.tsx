"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";

// 🧩 Props nhận vào
interface MenuProps {
  project_id: string | null;
  initialSubzone?: string | null;
}

// 🧱 Kiểu menu item
interface MenuItem {
  label: string; // hiển thị trên nút
  subzone_vi: string;
  building_type_vi: string;
}

// 🧩 Kiểu dữ liệu trả về từ API
interface NodeAttributeItem {
  building_type_vi?: string;
  [key: string]: unknown;
}

export default function Menu({ project_id, initialSubzone }: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subzoneFromQuery = searchParams.get("subzone_vi") || initialSubzone;

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 🛰️ Gọi API
  useEffect(() => {
    const fetchData = async () => {
      if (!project_id || !subzoneFromQuery) return;

      setLoading(true);
      try {
        const data = await createNodeAttribute({
          project_id,
          filters: [
            { label: "group", values: ["ct"] },
            { label: "subzone_vi", values: [subzoneFromQuery] },
          ],
        });

        console.log("📦 Dữ liệu trả về:", data);

        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          const uniqueMap = new Map<string, MenuItem>();

          data.data.forEach((item: NodeAttributeItem) => {
            const type_vi = (item.building_type_vi as string) || "";

            // ⚡ Bỏ trống hoặc trùng
            if (type_vi.trim() && !uniqueMap.has(type_vi)) {
              uniqueMap.set(type_vi, {
                label: type_vi, // ✅ hiển thị ra nút
                subzone_vi: subzoneFromQuery,
                building_type_vi: type_vi,
              });
            }
          });

          setMenuItems(Array.from(uniqueMap.values()));
        } else {
          setMenuItems([]);
        }
      } catch (error) {
        console.error("❌ Lỗi khi gọi API:", error);
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [project_id, subzoneFromQuery]);

  // ✅ Click navigate — chỉ truyền building_type_vi
  const handleNavigate = (subzone: string, building_type_vi: string) => {
    if (!project_id) return;
    router.push(
      `/chi-tiet-tieu-vung?id=${project_id}&subzone_vi=${encodeURIComponent(
        subzone
      )}&building_type_vi=${encodeURIComponent(building_type_vi)}`
    );
  };

  // ⬅️ Nút quay lại
  const handleBack = () => {
    if (!project_id) return;
    router.push(`/khu-vuc?id=${project_id}`);
  };

  // 🎨 Render giao diện
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

      {/* Title */}
      <div className={styles.title}>
        <h1>LOẠI CÔNG TRÌNH</h1>
      </div>

      {/* Danh sách nút */}
      <div className={styles.Function}>
        {loading ? (
          <Loader color="orange" />
        ) : menuItems.length > 0 ? (
          <div className={styles.scroll} style={{ marginTop: "5px" }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                className={styles.menuBtn}
                onClick={() =>
                  handleNavigate(item.subzone_vi, item.building_type_vi)
                }
                variant="filled"
                color="orange"
                style={{ marginBottom: "10px" }}
              >
                {item.label}
              </Button>
            ))}
          </div>
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
