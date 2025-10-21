"use client";

import { Image } from "@mantine/core";
import React from "react";
import styles from "./ZoningSystem.module.css";
import Menu from "./Menu/index";
import { pathsData } from "./Data";

interface ZoningSystemProps {
  project_id: string | null;
  initialPhase?: string | null;
  initialSubzoneType?: string | null; // đổi từ initialSubzone
}

export default function ZoningSystem({
  project_id,
  initialPhase,
  initialSubzoneType,
}: ZoningSystemProps) {
  return (
    <div className={styles.box}>
      {/* Hình bên trái */}
      <div className={styles.left}>
        <div className={styles.imageWrapper}>
          <Image src="/image/home_bg.png" alt="Ảnh" className={styles.img} />
          {pathsData.map((item) => (
            <div
              key={item.id}
              className={styles.overlaySvg}
              style={{ top: `${item.topPercent}%`, left: `${item.leftPercent}%` }}
              dangerouslySetInnerHTML={{ __html: item.svg }}
            />
          ))}
        </div>
      </div>

      {/* Menu bên phải */}
      <div className={styles.right}>
        <Menu
          project_id={project_id}
          initialPhase={initialPhase}
          initialBuildingType={initialSubzoneType} // đồng bộ
        />
      </div>
    </div>
  );
}
