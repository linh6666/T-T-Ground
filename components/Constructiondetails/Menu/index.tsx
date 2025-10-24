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
  initialBuildingTypeVi?: string | null;
  initialModelBuildingVi?: string | null; 
}

// 🧱 Kiểu menu item
interface MenuItem {
  label: string;
  subzone_vi: string;
  building_type_vi: string;
  model_building_vi: string;
}

// 🧩 Kiểu dữ liệu trả về từ API
interface NodeAttributeItem {
  building_type_vi?: string;
  model_building_vi?: string;
  building_code?: string;
  [key: string]: unknown;
}

export default function Menu({
  project_id,
  initialSubzone,
  initialBuildingTypeVi,
  initialModelBuildingVi,
}: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Lấy từ URL trước, fallback sang props
  const subzoneFromQuery = searchParams.get("subzone_vi") || initialSubzone || "";
  const buildingTypeViFromQuery =
    searchParams.get("building_type_vi") || initialBuildingTypeVi || "";
  const modelBuildingViFromQuery =
    searchParams.get("model_building_vi") || initialModelBuildingVi || "";

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 🛰️ Gọi API ban đầu
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
            { label: "building_type_vi", values: [buildingTypeViFromQuery] },
            { label: "model_building_vi", values: [modelBuildingViFromQuery] },
          ],
        });

        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          const uniqueMap = new Map<string, MenuItem>();
          data.data.forEach((item: NodeAttributeItem) => {
            const type_vi = item.building_code as string || "";
            if (type_vi.trim() && !uniqueMap.has(type_vi) && !type_vi.includes("Cảnh quan")) {
              uniqueMap.set(type_vi, {
                label: type_vi,
                subzone_vi: subzoneFromQuery,
                building_type_vi: buildingTypeViFromQuery,
                model_building_vi: type_vi,
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
  }, [project_id, subzoneFromQuery, buildingTypeViFromQuery, modelBuildingViFromQuery]);

  // ✅ Click navigate
  const handleBack = () => {
    if (!project_id) return;
    router.push(
      `/chi-tiet-tieu-vung?id=${project_id}&subzone_vi=${encodeURIComponent(
        subzoneFromQuery
      )}&building_type_vi=${encodeURIComponent(buildingTypeViFromQuery)}`
    );
  };

  // 🔹 Click vào nút menu để call API theo chính nút đó
 const handleItemClick = async (modelBuildingVi: string) => {
  if (!project_id || !subzoneFromQuery || !buildingTypeViFromQuery) return;

  try {
    // Gọi API mà không cập nhật menu items, không cần loading
    await createNodeAttribute({
      project_id,
      filters: [
        { label: "group", values: ["ct"] },
        { label: "subzone_vi", values: [subzoneFromQuery] },
        { label: "building_type_vi", values: [buildingTypeViFromQuery] },
        { label: "model_building_vi", values: [modelBuildingViFromQuery] },
        { label: "building_code", values: [modelBuildingVi] },
      ],
    });

    // Thêm logic xử lý phản hồi từ API nếu cần
  } catch (error) {
    console.error("❌ Lỗi khi click nút:", error);
  }
};

  // 🎨 Giao diện
  return (
    <div className={styles.box}>
      <div className={styles.logo}>
        <Image
          src="/Logo/TTHOMES logo-01.png"
          alt="Logo"
          className={styles.imgea}
        />
      </div>

      <div className={styles.title}>
        <h1>MẪU CÔNG TRÌNH</h1>
      </div>

      <div className={styles.Function}>
        {loading ? (
          <Loader color="orange" />
        ) : menuItems.length > 0 ? (
          <div className={styles.scroll} style={{ marginTop: "5px" }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                className={styles.menuBtn}
                variant="filled"
                color="orange"
                style={{ marginBottom: "10px" }}
                onClick={() => handleItemClick(item.model_building_vi)} // 🔹 click nút
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
