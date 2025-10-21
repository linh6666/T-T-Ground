"use client";

import { Image } from "@mantine/core";
import React from "react";
import styles from "./ZoningSystem.module.css";
import Menu from "./Menu/index";
import { pathsData } from "./Data";

// ✅ Interface mở rộng nhận thêm building_type
interface ZoningSystemProps {
  project_id: string | null;
  zone?: string | null;
  subzone?: string | null;
  building_type?: string | null; // 👈 thêm prop building_type_vi
}

export default function ZoningSystem({
  project_id,
  zone,
  subzone,
  building_type,
}: ZoningSystemProps) {
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
        {/* 👇 Truyền toàn bộ props cần thiết sang Menu */}
        <Menu
          project_id={project_id}
          initialZone={zone}
          initialSubzone={subzone}
          initialBuildingType={building_type} // 👈 truyền thêm building_type
        />
      </div>
    </div>
  );
}
