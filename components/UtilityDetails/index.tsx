"use client";

import { Image } from "@mantine/core";
import React from "react";
import styles from "./ZoningSystem.module.css";
import Menu from "./Menu/index"; 
import { pathsData } from "./Data";

interface ZoningSystemProps {
  project_id: string | null;
  zone?: string | null; // ← thêm prop zone
}

export default function ZoningSystem({ project_id, zone }: ZoningSystemProps) {
  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <div className={styles.imageWrapper}>
          <Image src="/image/home_bg.png" alt="Ảnh" className={styles.img} />

          {pathsData.map((item) => (
            <div
              key={item.id}
              className={styles.overlaySvg}
              style={{
                top: `${item.topPercent}%`,
                left: `${item.leftPercent}%`,
              }}
              dangerouslySetInnerHTML={{ __html: item.svg }}
            />
          ))}
        </div>
      </div>

      <div className={styles.right}>
        {/* 👇 Truyền cả project_id và zone xuống Menu */}
        <Menu project_id={project_id} initialZone={zone} />
      </div>
    </div>
  );
}
