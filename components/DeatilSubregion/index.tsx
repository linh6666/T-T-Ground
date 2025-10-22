"use client";

import { Image } from "@mantine/core";
import React from "react";
import styles from "./ZoningSystem.module.css";
import Menu from "./Menu/index";
// import { pathsData } from "./Data";

// 🧩 Kiểu props
interface ZoningSystemProps {
  project_id: string | null;
  subzone_vi?: string | null;
  building_type_vi?: string | null; // ✅ thêm trường này
}

export default function ZoningSystem({
  project_id,
  subzone_vi,
  building_type_vi, // ✅ nhận từ InteractiveClient
}: ZoningSystemProps) {
  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <div className={styles.imageWrapper}>
          <Image src="/image/home_bg2.png" alt="Ảnh" className={styles.img} />

          {/* {pathsData.map((item) => (
            <div
              key={item.id}
              className={styles.overlaySvg}
              style={{
                top: `${item.topPercent}%`,
                left: `${item.leftPercent}%`,
              }}
              dangerouslySetInnerHTML={{ __html: item.svg }}
            />
          ))} */}
        </div>
      </div>

      <div className={styles.right}>
        {/* 👇 Truyền cả project_id, subzone_vi và building_type_vi xuống Menu */}
        <Menu
          project_id={project_id}
          initialSubzone={subzone_vi}
          initialBuildingTypeVi={building_type_vi} // ✅ truyền xuống
        />
      </div>
    </div>
  );
}
