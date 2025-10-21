"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";

// Props nhận vào
interface MenuProps {
  project_id: string | null;
  initialZone?: string | null; // thêm dòng này
}

// Kiểu menu item
interface MenuItem {
  label: string;       // hiển thị phase_vi
  zone_vi: string;     // navigate
}

// Kiểu dữ liệu trả về từ API, thay cho any
interface NodeAttributeItem {
  subzone_vi?: string;
  [key: string]: unknown; // các trường khác không quan trọng
}

export default function Menu({ project_id, initialZone }: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const zoneFromQuery = searchParams.get("zone") || initialZone; // ưu tiên URL, fallback initialZone

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!project_id || !zoneFromQuery) return;

      setLoading(true);
      try {
        const data = await createNodeAttribute({
          project_id,
          filters: [
            { label: "group", values: ["ct", "phase_vi"] },
            { label: "zone_vi", values: [zoneFromQuery] },
          ],
        });

        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          const uniquePhaseMap = new Map<string, MenuItem>();

          // ✅ Chỉ sửa chỗ này: item: any → item: NodeAttributeItem
          data.data.forEach((item: NodeAttributeItem) => {
            const phaseStr: string = item.subzone_vi || zoneFromQuery;

            const phases: string[] = phaseStr
              .split(";")
              .map(p => p.trim())
              .filter(Boolean);

            phases.forEach((phaseLabel: string) => {
              // Nếu đã có trong Map thì bỏ qua → gộp dữ liệu giống nhau
              if (!uniquePhaseMap.has(phaseLabel)) {
                uniquePhaseMap.set(phaseLabel, {
                  label: phaseLabel,
                  zone_vi: zoneFromQuery,
                });
              }
            });
          });

          setMenuItems(Array.from(uniquePhaseMap.values()));
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
  }, [project_id, zoneFromQuery]);

  // Click nút navigate
const handleNavigate = (zone: string, subzone: string) => {
  if (!project_id) return;
  router.push(
    `/chi-tiet-khu?id=${project_id}&zone=${encodeURIComponent(
      zone
    )}&subzone=${encodeURIComponent(subzone)}`
  );
};

  // Nút back
  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Phan-khu?id=${project_id}`);
  };

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

      {/* Title */}
      <div className={styles.title}>
        <h1>Tiểu khu</h1>
      </div>

      {/* Menu Buttons */}
      <div className={styles.Function}>
        {loading ? (
          <Loader color="orange" />
        ) : menuItems.length > 0 ? (
          <div className={styles.scroll} style={{ marginTop: "5px" }}>
            {menuItems.map((item, index) => (
              <Button
  key={index}
  className={styles.menuBtn}
  onClick={() => handleNavigate(item.zone_vi, item.label)} // 👈 thêm subzone_vi
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

      {/* Footer Back Button */}
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
