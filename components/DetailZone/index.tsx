"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Image } from "@mantine/core";
import Menu from "./Menu/index";
import { pathsData, SvgItem } from "./Data";
import styles from "./ZoningSystem.module.css";

interface ZoningSystemProps {
  project_id: string | null;
  initialPhase?: string | null;
  initialBuildingType?: string | null;
}

export default function ZoningSystem({
  project_id,
  initialPhase,
  initialBuildingType,
}: ZoningSystemProps) {
  const [activeModels, setActiveModels] = useState<string[]>([]);

  // ✅ Debug: log khi activeModels thay đổi
  useEffect(() => {
    // console.log("🟢 activeModels hiện tại:", activeModels);
  }, [activeModels]);

  // ✅ Lọc SVG theo danh sách vùng được chọn
  // ✅ Lọc SVG theo danh sách vùng được chọn
const filteredPaths = useMemo(() => {
  // console.log("🔹 Bắt đầu lọc SVG, activeModels:", activeModels);

  if (!activeModels || activeModels.length === 0) {
    // console.log("❌ Không có vùng nào được chọn, không hiển thị SVG");
    return [];
  }

  const result = pathsData.map((item: SvgItem) => {
    // console.log(`➡️ Xử lý SVG id: ${item.id}`);

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(item.svg, "image/svg+xml");

    // Ẩn các rect/path không khớp
    Array.from(svgDoc.querySelectorAll("rect, path")).forEach(el => {
      const elPrefix = el.id?.split(".").slice(0, 2).join("."); // D-SH.18
      if (!elPrefix || !activeModels.includes(elPrefix)) {
        el.setAttribute("style", "display:none");
        // console.log(`   ❌ Ẩn ${el.tagName} id: ${el.id}`);
      } else {
        el.removeAttribute("style"); // đảm bảo hiển thị
        // console.log(`   ✅ Hiển thị ${el.tagName} id: ${el.id} → so sánh: ${elPrefix}`);
      }
    });

    return {
      ...item,
      svg: svgDoc.documentElement.outerHTML,
    };
  });

  // console.log("🔹 Kết quả filteredPaths:", result.map(i => i.id));
  return result;
}, [activeModels]);






  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <div className={styles.imageWrapper}>
          <Image src="/image/home_bg.png" alt="Ảnh" className={styles.img} />

          {filteredPaths.length > 0 ? (
            filteredPaths.map((item) => (
              <div
                key={item.id}
                className={styles.overlaySvg}
                style={{
                  top: `${item.topPercent}%`,
                  left: `${item.leftPercent}%`,
                }}
                dangerouslySetInnerHTML={{ __html: item.svg }}
              />
            ))
          ) : (
            <p>Không có SVG nào để hiển thị.</p>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <Menu
          project_id={project_id}
          initialPhase={initialPhase}
          initialBuildingType={initialBuildingType}
          onModelsLoaded={setActiveModels}
        />
      </div>
    </div>
  );
}
