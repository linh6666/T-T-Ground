"use client";

import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";
import { createON  } from "../../../api/apiON"; 
import { createOFF  } from "../../../api/apiOFF";
import Function from "./Function";

// Props nhận vào
interface MenuProps {
  project_id: string | null;
  initialBuildingType?: string | null;
}

// Kiểu menu item
interface MenuItem {
  label: string;       // hiển thị trên nút
  phase_vi: string;    // dùng để navigate
  subzone_vi: string;  // dùng để truyền query
}

// Kiểu dữ liệu trả về từ API
interface NodeAttributeItem {
  model_building_vi?: string;
  group?: string;
  [key: string]: unknown;
}

export default function Menu({ project_id, initialBuildingType }: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phaseFromQuery = searchParams.get("building") || initialBuildingType;
    const [active, setActive] = useState<"on" | "off" | null>(null);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
    const [loadingOn, setLoadingOn] = useState(false); 

  // 🛰️ Gọi API lấy danh sách building_type/subzone
 useEffect(() => {
  const fetchData = async () => {
    if (!project_id || !phaseFromQuery) return;

    setLoading(true);
    try {
      const data = await createNodeAttribute({
        project_id,
        filters: [
          { label: "group", values: ["ti"] },
          { label: "building_type_vi", values: [phaseFromQuery] },
        ],
      });

      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        const uniqueMap = new Map<string, MenuItem>();

     
      data.data.forEach((item: NodeAttributeItem) => {
  const subzone: string = item.model_building_vi || "";

  // ⚡ Nếu rỗng, chứa ';', hoặc chứa "Cảnh quan" thì bỏ qua
  if (
    subzone.trim() && 
    !subzone.includes(";") && 
    !subzone.includes("Cảnh quan") &&  // 🔹 Bỏ các model có "Cảnh quan"
    !uniqueMap.has(subzone)
  ) {
    uniqueMap.set(subzone, {
      label: subzone,
      phase_vi: phaseFromQuery,
      subzone_vi: subzone,
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


  // ✅ Khi click từng nút → gọi API chi tiết, không mất nút
  const handleMenuClick = async (subzoneLabel: string) => {
    if (!project_id || !phaseFromQuery) return;

    try {
      // 🔸 Gọi API
      const data = await createNodeAttribute({
        project_id,
        filters: [
          { label: "group", values: ["ti"] },
          { label: "building_type_vi", values: [phaseFromQuery] },
          { label: "model_building_vi", values: [subzoneLabel] },
        ],
      });

      // 🔹 Chỉ xử lý kết quả, không thay đổi UI
      console.log("✅ API trả về cho", subzoneLabel, data);
    } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
    }
  };

  // ⬅️ Nút quay lại
  const handleBack = () => {
    if (!project_id) return;
    router.push(`/tien-ich?id=${project_id}`);
  };
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
     const handleClickOFF = async () => {
      if (!project_id) return;
      setActive("off");
      setLoadingOn(true);
      try {
        const res = await createOFF({ project_id });
        console.log("✅ API ON result:", res);
      } catch (err) {
        console.error("❌ Lỗi khi gọi API ON:", err);
      } finally {
        setLoadingOn(false);
      }
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
        <h1>LOẠI TIỆN ÍCH</h1>
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
                variant="filled"
                color="orange"
                style={{ marginBottom: "10px" }}
                onClick={() => handleMenuClick(item.label)}
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
          <Stack align="center" gap="xs">
                 <Function />
                 <Group gap="xs">
                   {/* ✅ Nút ON có gọi API */}
                 <Button
         style={getButtonStyle(active === "on")}
         onClick={() => {
           if (active !== "on") {
             setActive("on");
             handleClickOn();
           } else {
             setActive(null); // nếu muốn tắt trạng thái ON
           }
         }}
         disabled={loadingOn}
       >
         <Text style={{ fontSize: "13px" }}>ON</Text>
       </Button>
       
                   {/* Nút OFF */}
                 <Button
         style={getButtonStyle(active === "off")}
         onClick={() => {
           if (active !== "off") {
             setActive("off");
             handleClickOFF();
           } else {
             setActive(null); // nếu muốn tắt trạng thái OFF
           }
         }}
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
