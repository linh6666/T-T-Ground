"use client";

import React, { useEffect, useState, useCallback } from "react";
import styles from "./Menu.module.css";
import { Button, Group, Image, Loader, Stack, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { createNodeAttribute } from "../../../api/apifilter";
import { createON } from "../../../api/apiON";
import { createOFF } from "../../../api/apiOFF";
import Function from "./Function";

interface MenuProps {
  project_id: string | null;
  initialPhase?: string | null;
  onPhaseChange?: (phases: string) => void;
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

export default function Menu({
  project_id,
  initialPhase,
  onPhaseChange,
}: MenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phaseValue = searchParams.get("phase") || initialPhase;
  const [active, setActive] = useState<"on" | "off" | null>(null);
  const [phase, setPhase] = useState<string>(phaseValue || "");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMultiMode, setIsMultiMode] = useState<"single" | "multi" | null>("multi");

  useEffect(() => {
    if (phaseValue && phaseValue !== phase) {
      setPhase(phaseValue);
      onPhaseChange?.(phaseValue);
    }
  }, [phaseValue, phase, onPhaseChange]);

  const fetchData = useCallback(async () => {
    if (!project_id || !phase) return;
    setLoading(true);
    try {
      const data = await createNodeAttribute({
        project_id,
        filters: [
          { label: "group", values: ["ct"] },
          { label: "phase_vi", values: [phase] },
        ],
      });

      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        const uniqueMap = new Map<string, MenuItem>();

        data.data.forEach((item: NodeAttributeItem) => {
          const buildingType = item.building_type_vi || "";
          const groupValue = item.group as string | undefined;

          if (
            buildingType.trim() &&
            !buildingType.includes(";") &&
            groupValue !== "ct;ti" &&
            !uniqueMap.has(buildingType)
          ) {
            uniqueMap.set(buildingType, {
              label: buildingType,
              phase_vi: phase,
              building_type_vi: buildingType,
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
  }, [project_id, phase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNavigate = (phase: string, buildingType: string) => {
    if (!project_id) return;
    router.push(
      `/chi-tiet-khu?id=${project_id}&phase=${encodeURIComponent(
        phase
      )}&building_type_vi=${encodeURIComponent(buildingType)}`
    );
  };

  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Phan-khu?id=${project_id}`);
  };

  const handleClickOn = async () => {
    if (!project_id) return;
    setActive("on");
    try {
      const res = await createON({ project_id });
      console.log("✅ API ON result:", res);
    } catch (err) {
      console.error("❌ Lỗi khi gọi API ON:", err);
    }
  };

  const handleClickOFF = async () => {
    if (!project_id) return;
    setActive("off");
    try {
      const res = await createOFF({ project_id });
      console.log("✅ API OFF result:", res);
    } catch (err) {
      console.error("❌ Lỗi khi gọi API OFF:", err);
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
    background: isActive ? "linear-gradient(to top, #FFE09A,#FFF1D2)" : "#FFFAEE",
    color: "#752E0B",
    border: "1.5px solid #752E0B",
  });

  return (
    <div className={styles.box}>
      <div className={styles.logo}>
        <Image
          src="/Logo/logo-tt-city-millennia.png"
          alt="Logo"
          className={styles.imgea}
        />
      </div>

       <div className={styles.title}>
        <h1>{phase?.toUpperCase()}</h1>

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
                  handleNavigate(item.phase_vi, item.building_type_vi)
                }
                variant="filled"
                color="orange"
                style={{
                  marginBottom: "10px",
                  background: isMultiMode === "multi"
                    ? "linear-gradient(to top, #FFE09A,#FFF1D2)"
                    : undefined,
                }}
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
        <Stack align="center" gap="xs">
          <Function
            activeMode={isMultiMode}
            setActiveMode={setIsMultiMode}
            onMultiModeClick={handleMultiModeClick}
          />
          <Group gap="xs">
            <Button
              style={getButtonStyle(active === "on")}
              onClick={() => {
                if (active !== "on") {
                  setActive("on");
                  handleClickOn();
                } else {
                  setActive(null);
                }
              }}
            >
              <Text style={{ fontSize: "13px" }}>ON</Text>
            </Button>

            <Button
              style={getButtonStyle(active === "off")}
              onClick={() => {
                if (active !== "off") {
                  setActive("off");
                  handleClickOFF();
                } else {
                  setActive(null);
                }
              }}
            >
              <Text style={{ fontSize: "12px" }}>OFF</Text>
            </Button>

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
