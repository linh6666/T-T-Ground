"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute  } from "../../../api/apifilter";
import { createON  } from "../../../api/apiON"; // ✅ import thêm createON
import Function from "./Function";

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
  const [active, setActive] = useState<"on" | "off" | null>(null);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingOn, setLoadingOn] = useState(false); // ⏳ loader cho nút ON

  // 🛰️ Gọi API danh sách loại công trình
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
            const groupValue = item.group as string | undefined;

            // ✅ Lọc bỏ item rỗng, chứa ';', hoặc group là "ct;ti"
            if (
              buildingType.trim() &&
              !buildingType.includes(";") &&
              groupValue !== "ct;ti" &&
              !uniqueMap.has(buildingType)
            ) {
              uniqueMap.set(buildingType, {
                label: buildingType,
                phase_vi: phaseFromQuery,
                building_type_vi: buildingType,
              });
            }
          });

          const finalItems = Array.from(uniqueMap.values());

          // 🔥 Sắp xếp ưu tiên các loại công trình cố định
          const priorityOrder = [
            "Trung tâm thương mại",
            "Trường học",
            "Giao thông",
            "Thể dục thể thao",
            "Đài phun nước",
            "Cảnh quan",
            "Sông",
          ];

          finalItems.sort((a, b) => {
            const indexA = priorityOrder.indexOf(a.label);
            const indexB = priorityOrder.indexOf(b.label);

            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.label.localeCompare(b.label);
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

  // ✅ Click quay lại
  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Phan-khu?id=${project_id}`);
  };

  // ✅ Hàm xử lý khi click ON
  const handleClickOn = async () => {
    if (!project_id) return;
    setActive("on");
    setLoadingOn(true);
    try {
      const res = await createON({ project_id });
      console.log("✅ API ON result:", res);
    } catch (err) {
      console.error("❌ Lỗi khi gọi API ON:", err);
    } finally {
      setLoadingOn(false);
    }
  };

  // 🎨 Style cho nút
  const getButtonStyle = (isActive: boolean) => ({
    width: 30,
    height: 30,
    padding: 0,
    borderRadius: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    transition: "background 0.3s",
    background: isActive
      ? "linear-gradient(to top, #FFE09A,#FFF1D2)"
      : "#FFFAEE",
    color: "#752E0B",
    border: "1.5px solid #752E0B",
  });

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
                onClick={() =>
                  handleNavigate(item.phase_vi, item.building_type_vi)
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

      {/* Footer */}
      <div className={styles.footer}>
        <Stack align="center" gap="xs">
          <Function />
          <Group gap="xs">
            {/* ✅ Nút ON có gọi API */}
            <Button
              variant="filled"
              style={getButtonStyle(active === "on")}
              onClick={handleClickOn}
              disabled={loadingOn}
            >
              {loadingOn ? (
                <Loader size={14} color="orange" />
              ) : (
                <Text style={{ fontSize: "13px" }}>ON</Text>
              )}
            </Button>

            {/* Nút OFF */}
            <Button
              variant="filled"
              style={getButtonStyle(active === "off")}
              onClick={() => setActive(active === "off" ? null : "off")}
            >
              <Text style={{ fontSize: "12px" }}>OFF</Text>
            </Button>

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
        </Stack>
      </div>
    </div>
  );
}
