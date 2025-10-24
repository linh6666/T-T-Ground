"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";

interface MenuProps {
  project_id: string | null;
  initialPhase?: string | null;
}

interface MenuItem {
  label: string;
  phase_vi: string;
  building_type_vi: string;
}

interface NodeAttributeItem {
  building_type_vi?: string;
  [key: string]: unknown;
}

export default function Menu({ project_id, initialPhase }: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phaseFromQuery = searchParams.get("phase") || initialPhase;

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 🛰️ Gọi API
  useEffect(() => {
    const fetchData = async () => {
      if (!project_id || !phaseFromQuery) return;

      setLoading(true);
      try {
        const data = await createNodeAttribute({
          project_id,
          filters: [
            { label: "group", values: ["ct"] },
            { label: "phase_vi", values: [phaseFromQuery] },
          ],
        });

        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          const uniqueMap = new Map<string, MenuItem>();

          data.data.forEach((item: NodeAttributeItem) => {
            const buildingType = item.building_type_vi || "";

            if (buildingType.trim() && !buildingType.includes(";") && !uniqueMap.has(buildingType)) {
              uniqueMap.set(buildingType, {
                label: buildingType,
                phase_vi: phaseFromQuery,
                building_type_vi: buildingType,
              });
            }
          });

          const finalItems = Array.from(uniqueMap.values());

          // 🔥 Sắp xếp ưu tiên 3 loại công trình cố định trước
          const priorityOrder = ["Trung tâm thương mại", "Trường học", "Giao thông","Thể dục thể thao","Đài phun nước","Cảnh quan","Sông"];

          finalItems.sort((a, b) => {
            const indexA = priorityOrder.indexOf(a.label);
            const indexB = priorityOrder.indexOf(b.label);

            if (indexA !== -1 && indexB !== -1) {
              // Cả hai đều trong danh sách ưu tiên → theo thứ tự trong mảng
              return indexA - indexB;
            } else if (indexA !== -1) {
              // a là loại ưu tiên → lên đầu
              return -1;
            } else if (indexB !== -1) {
              // b là loại ưu tiên → lên đầu
              return 1;
            } else {
              // Cả hai không trong danh sách → sắp xếp alphabet
              return a.label.localeCompare(b.label);
            }
          });

          setMenuItems(finalItems);
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
  }, [project_id, phaseFromQuery]);

  // ✅ Click navigate
  const handleNavigate = (phase: string, buildingType: string) => {
    if (!project_id) return;
    router.push(
      `/chi-tiet-khu?id=${project_id}&phase=${encodeURIComponent(
        phase
      )}&building_type_vi=${encodeURIComponent(buildingType)}`
    );
  };

  // ⬅️ Quay lại
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
        <h1>LOẠI CÔNG TRÌNH</h1>
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
