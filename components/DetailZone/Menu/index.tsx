"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";

interface MenuProps {
  project_id: string | null;
  initialPhase?: string | null;
  initialBuildingType?: string | null;
}

interface MenuItem {
  model_building_vi: string;
  phase_vi: string;
}

interface NodeAttributeItem {
  model_building_vi?: string;
  [key: string]: unknown;
}

export default function Menu({
  project_id,
  initialPhase,
  initialBuildingType,
}: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const phaseFromQuery = searchParams.get("phase") || initialPhase;
  const buildingTypeFromQuery =
    searchParams.get("building_type_vi") || initialBuildingType;

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // 🛰️ Lấy danh sách mẫu nhà ban đầu
  useEffect(() => {
    const fetchData = async () => {
      if (!project_id || !phaseFromQuery || !buildingTypeFromQuery) return;

      try {
        const data = await createNodeAttribute({
          project_id,
          filters: [
            { label: "group", values: ["ct", "phase_vi"] },
            { label: "phase_vi", values: [phaseFromQuery] },
            { label: "building_type_vi", values: [buildingTypeFromQuery] },
          ],
        });

        if (data?.data && Array.isArray(data.data)) {
          const uniqueMap = new Map<string, MenuItem>();
          data.data.forEach((item: NodeAttributeItem) => {
            const modelLabel = item.model_building_vi as string;
            if (modelLabel && !uniqueMap.has(modelLabel)) {
              uniqueMap.set(modelLabel, {
                model_building_vi: modelLabel,
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
      }
    };

    fetchData();
  }, [project_id, phaseFromQuery, buildingTypeFromQuery]);

  // 🧭 Khi click vào model cụ thể → gọi lại API theo model_building_vi
  const handleSelectModel = async (modelName: string) => {
    if (!project_id || !phaseFromQuery || !buildingTypeFromQuery) return;

    try {
      const result = await createNodeAttribute({
        project_id,
        filters: [
          { label: "group", values: ["ct", "phase_vi"] },
          { label: "phase_vi", values: [phaseFromQuery] },
          { label: "building_type_vi", values: [buildingTypeFromQuery] },
          { label: "model_building_vi", values: [modelName] },
        ],
      });

      console.log("📦 Dữ liệu model cụ thể:", result);
      // router.push(`/chi-tiet-nha?id=${project_id}&model=${encodeURIComponent(modelName)}`);
    } catch (error) {
      console.error("❌ Lỗi khi gọi lại API model:", error);
    }
  };

  // 🔙 Nút quay lại
  const handleBack = () => {
    if (!project_id || !phaseFromQuery) return;
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
        <h1>MẪU CÔNG TRÌNH</h1>
      </div>

      {/* Menu Buttons */}
      <div className={styles.Function}>
        {menuItems.length > 0 ? (
          <div className={styles.scroll} style={{ marginTop: "5px" }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                className={styles.menuBtn}
                onClick={() => handleSelectModel(item.model_building_vi)}
                variant="filled"
                color="orange"
                style={{ marginBottom: "10px" }}
              >
                {item.model_building_vi}
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

