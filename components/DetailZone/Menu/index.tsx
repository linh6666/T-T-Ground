"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";

// ⚙️ Props
interface MenuProps {
  project_id: string | null;
  initialPhase?: string | null;
  initialBuildingType?: string | null;
}

// ⚙️ Kiểu item hiển thị
interface MenuItem {
  building_type_vi: string;
  phase_vi: string;
}

// ⚙️ Kiểu dữ liệu API trả về
interface NodeAttributeItem {
  building_type_vi?: string;
  [key: string]: unknown;
}

export default function Menu({
  project_id,
  initialPhase,
  initialBuildingType,
}: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔎 Lấy từ URL hoặc prop truyền xuống
  const phaseFromQuery = searchParams.get("phase") || initialPhase;
  const buildingTypeFromQuery = searchParams.get("subzone_vi") || initialBuildingType;

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 🛰️ Fetch dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      if (!project_id || !phaseFromQuery || !buildingTypeFromQuery) return;

      setLoading(true);
      try {
        const data = await createNodeAttribute({
          project_id,
          filters: [
            { label: "group", values: ["ct", "phase_vi"] },
            { label: "phase_vi", values: [phaseFromQuery] },
            { label: "subzone_vi", values: [buildingTypeFromQuery] },
          ],
        });

        if (data?.data && Array.isArray(data.data)) {
          const uniqueMap = new Map<string, MenuItem>();

          data.data.forEach((item: NodeAttributeItem) => {
            const typeLabel = item.building_type_vi;
            if (typeLabel && !uniqueMap.has(typeLabel)) {
              uniqueMap.set(typeLabel, {
                building_type_vi: typeLabel,
                phase_vi: phaseFromQuery!,
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
  }, [project_id, phaseFromQuery, buildingTypeFromQuery]);

  // 🧭 Xử lý điều hướng khi click nút loại nhà
  const handleNavigate = (phase: string, building_type: string) => {
    if (!project_id) return;
    router.push(
      `/chi-tiet-nha?id=${project_id}&phase=${encodeURIComponent(
        phase
      )}&subzone_vi=${encodeURIComponent(building_type)}`
    );
  };

  // 🔙 Nút quay lại
const handleBack = () => {
  if (!project_id || !phaseFromQuery) return;

  // 🔹 Sửa path từ /chi-tiet-khu → /chi-tiet
  router.push(
    `/chi-tiet?id=${project_id}&phase=${encodeURIComponent(phaseFromQuery)}`
  );
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
        <h1>Loại nhà</h1>
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
                onClick={() => handleNavigate(item.phase_vi, item.building_type_vi)}
                variant="filled"
                color="orange"
                style={{ marginBottom: "10px" }}
              >
                {item.building_type_vi}
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
