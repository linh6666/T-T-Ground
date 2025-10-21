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
}

// Kiểu menu item
interface MenuItem {
  label: string;       // hiển thị trên nút
  phase_vi: string;    // dùng để navigate
  subzone_vi: string;  // dùng để truyền query
}

// Kiểu dữ liệu trả về từ API
interface NodeAttributeItem {
  subzone_vi?: string;
  [key: string]: unknown;
}

export default function Menu({ project_id, initialPhase }: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phaseFromQuery = searchParams.get("phase") || initialPhase;

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 🛰️ Gọi API lấy danh sách building_type/subzone
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
            const subzone: string = item.subzone_vi || "";

            // ⚡ Nếu rỗng hoặc chứa ';' thì bỏ qua
            if (subzone.trim() && !subzone.includes(";") && !uniqueMap.has(subzone)) {
              uniqueMap.set(subzone, {
                label: subzone,       // hiển thị trên nút
                phase_vi: phaseFromQuery,
                subzone_vi: subzone,  // truyền query param
              });
            }
          });

          const finalItems = Array.from(uniqueMap.values());
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
  const handleNavigate = (phase: string, subzone: string) => {
    if (!project_id) return;
    router.push(
      `/chi-tiet-khu?id=${project_id}&phase=${encodeURIComponent(phase)}&subzone_vi=${encodeURIComponent(subzone)}`
    );
  };

  // ⬅️ Nút quay lại
  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Phan-khu?id=${project_id}`);
  };

  // 🎨 Render giao diện
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
                onClick={() => handleNavigate(item.phase_vi, item.subzone_vi)}
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
