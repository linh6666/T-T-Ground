"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Stack, Loader, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";

// ✅ Kiểu prop nhận vào
interface MenuProps {
  project_id: string | null;
}

// ✅ Kiểu dữ liệu item trong menu
interface MenuItem {
  label: string;
  link: string;
}

// ✅ Kiểu dữ liệu trả về từ API createNodeAttribute
interface NodeAttributeItem {
  zone_vi?: string;
  [key: string]: unknown; // các trường khác nếu chưa biết rõ
}

export default function Menu({ project_id }: MenuProps) {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Gọi API khi có project_id
  useEffect(() => {
    const fetchData = async () => {
      if (!project_id) return;

      setLoading(true);
      try {
        const body = {
          project_id,
          filters: [{ label: "group", values: ["ct", "zone_vi"] }],
        };

        const data = await createNodeAttribute(body);

        if (data?.data && Array.isArray(data.data)) {
          // 🔹 Tách các zone_vi (có thể có nhiều zone cách nhau bằng ;)
          const allZones: string[] = data.data
            .flatMap((item: NodeAttributeItem) =>
              String(item.zone_vi || "")
                .split(";")
                .map((z) => z.trim())
                .filter((z) => z !== "")
            );

          // 🔹 Loại trùng
          const uniqueZones = Array.from(new Set(allZones));

          // 🔹 Sắp xếp thứ tự alphabet hoặc theo số
          const sortedZones = uniqueZones.sort((a, b) => {
            const numA = a.match(/\d+/)?.[0];
            const numB = b.match(/\d+/)?.[0];
            if (numA && numB) return Number(numA) - Number(numB);
            return a.localeCompare(b, "vi", { sensitivity: "base" });
          });

          // 🔹 Tạo danh sách menu
          const items: MenuItem[] = sortedZones.map((zone) => ({
            label: zone,
            link: `zone/${encodeURIComponent(zone)}`,
          }));

          setMenuItems(items);
        } else {
          console.warn("⚠️ Dữ liệu trả về không đúng định dạng:", data);
        }
      } catch (error) {
        console.error("❌ Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [project_id]);

  // ✅ Hàm điều hướng khi click vào nút phân khu
  const handleNavigate = (zoneLabel: string, path: string) => {
    if (!project_id) {
      console.warn("⚠️ Thiếu project_id, không thể điều hướng đúng.");
      return;
    }

    router.push(
      `/chi-tiet${path}?id=${project_id}&zone_vi=${encodeURIComponent(zoneLabel)}`
    );
  };

  // ✅ Hàm quay lại trang trước (nút mũi tên)
  const handleBack = () => {
    if (!project_id) {
      console.warn("⚠️ Thiếu project_id khi quay lại trang điều khiển.");
      return;
    }
    router.push(`/Dieu-khien?id=${project_id}`);
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

      {/* Tiêu đề */}
      <div className={styles.title}>
        <h1>Phân Khu</h1>
      </div>

      {/* Danh sách nút */}
      <div className={styles.Function}>
        {loading ? (
          <Loader color="orange" />
        ) : menuItems.length > 0 ? (
          <Stack align="center" style={{ gap: "20px", marginTop: "30px" }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                className={styles.menuBtn}
                onClick={() => handleNavigate(item.label, item.link)}
                variant="outline"
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        ) : (
          <Text mt="md" c="dimmed">
            Không có dữ liệu hiển thị
          </Text>
        )}
      </div>

      {/* Footer */}
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
            <Group gap={0} align="center">
              <IconArrowLeft size={18} color="#752E0B" />
            </Group>
          </Button>
        </Group>
      </div>
    </div>
  );
}
