"use client";

import React, { useState, useMemo, useRef } from "react";
import { Image } from "@mantine/core";
import Menu from "./Menu/index";
import { pathsData, SvgItem } from "./Data";
import styles from "./ZoningSystem.module.css";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

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
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // ✅ ref để điều khiển zoom/pan
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);

  const filteredPaths = useMemo(() => {
    if (!activeModels || activeModels.length === 0) return [];

    const result = pathsData.map((item: SvgItem) => {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(item.svg, "image/svg+xml");

      Array.from(svgDoc.querySelectorAll("rect, path")).forEach((el) => {
        const elPrefix = el.id?.split(".").slice(0, 2).join(".");
        if (!elPrefix || !activeModels.includes(elPrefix)) {
          el.setAttribute("style", "display:none");
        } else {
          el.removeAttribute("style");
          if (selectedModel && elPrefix === selectedModel) {
            el.setAttribute("fill", "red");
            el.setAttribute("stroke", "red");
          }
        }
      });

      return {
        ...item,
        svg: svgDoc.documentElement.outerHTML,
      };
    });

    return result;
  }, [activeModels, selectedModel]);

  // ✅ Khi click model bên Menu
  const handleModelSelect = (modelName: string) => {
    setSelectedModel((prev) => (prev === modelName ? null : modelName));

    // Zoom vào vùng SVG tương ứng (giả sử có id là modelName)
    const svgElement = document.getElementById(modelName);
    if (svgElement && transformRef.current) {
      const bbox = svgElement.getBoundingClientRect();
      const centerX = bbox.left + bbox.width / 2;
      const centerY = bbox.top + bbox.height / 2;
      transformRef.current.setTransform(centerX, centerY, 3); // Zoom 3x vào vùng đó
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <TransformWrapper
          ref={transformRef}
          initialScale={1}
          minScale={1}
          maxScale={5}
          wheel={{ step: 0.2 }}
          doubleClick={{ disabled: true }}
        >
          <TransformComponent>
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
          </TransformComponent>
        </TransformWrapper>
      </div>

      <div className={styles.right}>
        <Menu
          project_id={project_id}
          initialPhase={initialPhase}
          initialBuildingType={initialBuildingType}
          onModelsLoaded={setActiveModels}
          onSelectModel={handleModelSelect} // ✅ truyền xuống Menu
        />
      </div>
    </div>
  );
}

