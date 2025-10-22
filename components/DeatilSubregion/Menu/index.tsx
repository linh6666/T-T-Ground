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
  initialBuildingTypeVi?: string | null; // ✅ thêm props
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
  [key: string]: unknown;
}

export default function Menu({
  project_id,
  initialSubzone,
  initialBuildingTypeVi,
}: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Ưu tiên lấy từ URL, fallback sang props
  const subzoneFromQuery = searchParams.get("subzone_vi") || initialSubzone || "";
  const buildingTypeViFromQuery =
    searchParams.get("building_type_vi") || initialBuildingTypeVi || "";

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
            { label: "building_type_vi", values: [buildingTypeViFromQuery] }, // ✅ luôn truyền thẳng vào filter
          ],
        });

        console.log("📦 Dữ liệu trả về:", data);

        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          const uniqueMap = new Map<string, MenuItem>();

          data.data.forEach((item: NodeAttributeItem) => {
            const type_vi = (item. model_building_vi as string) || "";
            if (type_vi.trim() && !uniqueMap.has(type_vi)) {
              uniqueMap.set(type_vi, {
                label: type_vi,
                subzone_vi: subzoneFromQuery,
                building_type_vi:buildingTypeViFromQuery ,
                  model_building_vi: type_vi
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
  }, [project_id, subzoneFromQuery, buildingTypeViFromQuery]);

  // ✅ Click navigate
const handleNavigate = (subzone: string, building_type_vi: string, model_building_vi: string) => {
  if (!project_id) return;
  router.push(
    `/chi-tiet-xay-dung?id=${project_id}&subzone_vi=${encodeURIComponent(subzone)}&building_type_vi=${encodeURIComponent(building_type_vi)}&model_building_vi=${encodeURIComponent(model_building_vi)}` // Thêm model_building_vi vào URL
  );
};
  // ⬅️ Nút quay lại
const handleBack = () => {
  if (!project_id) return;
  router.push(`/tieu-vung?id=${project_id}&subzone_vi=${encodeURIComponent(subzoneFromQuery)}`); // Cập nhật đường dẫn
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
        <h1>Loại nhà</h1>
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
              onClick={() =>
    handleNavigate(item.subzone_vi, item.building_type_vi, item.model_building_vi) // Cập nhật đây
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
