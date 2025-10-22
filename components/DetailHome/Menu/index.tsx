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
  initialPhase?: string | null; 
    initialSubzone?: string | null;      
  initialBuildingType?: string | null;
}

// Kiểu menu item
interface MenuItem {
  model_building_vi: string; // 👈 đổi sang model_building_vi để hiển thị
  zone_vi: string;
  subzone_vi: string;
  building_type_vi: string;
}

// Kiểu dữ liệu trả về từ API
interface NodeAttributeItem {
  model_building_vi?: string;
  building_type_vi?: string;
  subzone_vi?: string;
  [key: string]: unknown;
}

export default function Menu({
  project_id,
 initialPhase,
  initialSubzone,
  initialBuildingType,
}: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const zoneFromQuery = searchParams.get("phase") || initialPhase;
  const subzoneFromQuery = searchParams.get("subzone") || initialSubzone;
  const buildingTypeFromQuery =
    searchParams.get("type") || initialBuildingType;

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 🛰️ Gọi API lấy danh sách model_building_vi
  useEffect(() => {
    const fetchData = async () => {
      if (
        !project_id ||
        !zoneFromQuery ||
        !subzoneFromQuery ||
        !buildingTypeFromQuery
      )
        return;

      setLoading(true);
      try {
        const data = await createNodeAttribute({
          project_id,
          filters: [
            { label: "group", values: ["ct"] },
            { label: "phase_vi", values: [zoneFromQuery] },
            { label: "subzone_vi", values: [subzoneFromQuery] },
            { label: "building_type_vi", values: [buildingTypeFromQuery] },
          ],
        });

        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          const uniqueMap = new Map<string, MenuItem>();

          data.data.forEach((item: NodeAttributeItem) => {
            const modelLabel = item.model_building_vi;
            if (modelLabel && !uniqueMap.has(modelLabel)) {
              uniqueMap.set(modelLabel, {
                model_building_vi: modelLabel,
                building_type_vi: item.building_type_vi || "",
                zone_vi: zoneFromQuery!,
                subzone_vi: subzoneFromQuery!,
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
  }, [project_id, zoneFromQuery, subzoneFromQuery, buildingTypeFromQuery]);

  // 👉 Khi click vào 1 model cụ thể
  // const handleNavigate = (
  //   zone: string,
  //   subzone: string,
  //   type: string,
  //   model: string
  // ) => {
  //   if (!project_id) return;
  //   router.push(
  //     `/chi-tiet-khu?id=${project_id}&zone=${encodeURIComponent(
  //       zone
  //     )}&subzone=${encodeURIComponent(
  //       subzone
  //     )}&type=${encodeURIComponent(
  //       type
  //     )}&model=${encodeURIComponent(model)}`
  //   );
  // };

  // 👉 Nút back
  const handleBack = () => {
  if (!project_id || !zoneFromQuery || !subzoneFromQuery) return;

router.push(
  `/chi-tiet-khu?id=${encodeURIComponent(project_id)}&phase=${encodeURIComponent(
    zoneFromQuery
  )}&subzone_vi=${encodeURIComponent(subzoneFromQuery)}`
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
        <h1>Chi tiết nhà</h1>
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
                // onClick={() =>
                //   handleNavigate(
                //     item.zone_vi,
                //     item.subzone_vi,
                //     item.building_type_vi,
                //     item.model_building_vi
                //   )
                // }
                variant="filled"
                color="orange"
                style={{ marginBottom: "10px" }}
              >
                {item.model_building_vi} {/* 👈 Hiển thị model nhà */}
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
