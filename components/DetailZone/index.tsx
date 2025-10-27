"use client";

import React, { useState } from "react";
import { Image } from "@mantine/core";
import Menu from "./Menu/index";
import { pathsData } from "./Data";
import styles from "./ZoningSystem.module.css";

// ⚙️ Props ZoningSystem
interface ZoningSystemProps {
  project_id: string | null;
  initialPhase?: string | null;
  initialBuildingType?: string | null; // 🔁 đổi từ initialSuzone → initialBuildingType
}

export default function ZoningSystem({
  project_id,
  initialPhase,
  initialBuildingType,
}: ZoningSystemProps) {
  const [activeModels, setActiveModels] = useState<string[]>([]);
  console.log("Active Models:", activeModels);
  // 🧩 Hàm check active
  const activeSet = new Set(activeModels.map((m) => m.trim().toLowerCase()));

  const isActiveRect = (id: string) =>
    Array.from(activeSet).some((activeId) =>
      id.trim().toLowerCase().startsWith(activeId.trim().toLowerCase())
    );
  console.log("Active Set:", activeSet);
  console.log("isActiveRect(D-SH.18):", isActiveRect("D-SH.18"));

  return (
    <div className={styles.box}>
      {/* Hình bên trái */}
      <div className={styles.left}>
        <div className={styles.imageWrapper}>
          <Image src="/image/home_bg.png" alt="Ảnh" className={styles.img} />
          {pathsData.map((group) => (
            <svg
              key={group.id}
              className={styles.svgOverlay}
              style={{
                position: "absolute", // Đảm bảo rằng SVG được định vị tuyệt đối
                top: `${group.topPercent}%`,
                left: `${group.leftPercent}%`,
                zIndex: 2, // Đặt SVG lên trên hình ảnh
              }}
              width="874"
              height="670"
              viewBox="0 0 1282.928 855.778"
            >
              {group.rects.map((rect) => {
                const active = isActiveRect(rect.id);
                return (
                  <rect
                    key={rect.id}
                    id={rect.id}
                    width={rect.width}
                    height={rect.height}
                    transform={rect.transform}
                    fill={active ? rect.fill : "none"}
                    stroke={active ? rect.stroke : "none"}
                    strokeWidth={0.5}
                  />
                );
              })}
            </svg>
          ))}
        </div>
      </div>

      {/* Menu bên phải */}
      <div className={styles.right}>
        <Menu
          project_id={project_id}
          initialPhase={initialPhase}
          initialBuildingType={initialBuildingType} // 🔁 truyền prop mới xuống Menu
          onModelsLoaded={setActiveModels}
        />
      </div>
    </div>
  );
}
