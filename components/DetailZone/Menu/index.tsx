import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Stack, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";
import { createON } from "../../../api/apiON";
import { createOFF } from "../../../api/apiOFF";
import Function from "./Function";

interface MenuProps {
  project_id: string | null;
  initialPhase?: string | null;
  initialBuildingType?: string | null;
  onModelsLoaded?: (models: string[]) => void;
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
  onModelsLoaded,
}: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const phaseFromQuery = searchParams.get("phase") || initialPhase;
  const buildingTypeFromQuery =
    searchParams.get("building_type_vi") || initialBuildingType;
  const [active, setActive] = useState<"on" | "off" | null>(null);
  const [isMultiMode, setIsMultiMode] = useState<"single" | "multi" | null>("multi");
  const [loadingOn, setLoadingOn] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

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

        onModelsLoaded?.(
          data.data.map((i: NodeAttributeItem) => i.model_building_vi)
        );

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

  useEffect(() => {
    fetchData();
  }, [project_id, phaseFromQuery, buildingTypeFromQuery, onModelsLoaded]);

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

    // ✅ Gọi lại để cập nhật vùng active
    onModelsLoaded?.([modelName]);

  } catch (error) {
    console.error("❌ Lỗi khi gọi lại API model:", error);
  }
};


  const handleBack = () => {
    if (!project_id || !phaseFromQuery) return;
    router.push(
      `/chi-tiet?id=${project_id}&phase=${encodeURIComponent(phaseFromQuery)}`
    );
  };

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
      console.log("✅ API OFF result:", res);
    } catch (err) {
      console.error("❌ Lỗi khi gọi API OFF:", err);
    } finally {
      setLoadingOn(false);
    }
  };

  const handleMultiModeClick = () => {
    setIsMultiMode("multi");
    fetchData();
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
        <h1>{buildingTypeFromQuery?.toUpperCase()}</h1>
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
                style={{
                  marginBottom: "10px",
                  background: isMultiMode === "multi"
                    ? "linear-gradient(to top, #FFE09A,#FFF1D2)"
                    : undefined,
                }}
                 disabled={isMultiMode === "multi"} 
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
        <Stack align="center" gap="xs">
          <Function
            activeMode={isMultiMode}
            setActiveMode={setIsMultiMode}
            onMultiModeClick={handleMultiModeClick}
          />
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