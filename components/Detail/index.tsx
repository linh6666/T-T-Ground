"use client";

import { Image } from "@mantine/core";
import React, { useState, useRef, useEffect } from "react";
import styles from "./ZoningSystem.module.css";
import Menu from "./Menu/index";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { useSearchParams } from "next/navigation";

interface ZoningSystemProps {
  project_id: string | null;
  phase?: string | null;
}

export default function ZoningSystem({ project_id }: ZoningSystemProps) {
  const searchParams = useSearchParams();
  const urlPhase = searchParams.get("phase");
  const [currentPhase, setCurrentPhase] = useState<string>(urlPhase || "");
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);

  // ✅ Hàm pan/zoom tới phase tương ứng
  const panToPhase = (phase: string) => {
    if (!transformRef.current) return;

    switch (phase) {
      case "THE MARINA":
        transformRef.current.setTransform(-117, -81, 1.2);
        break;
      case "THE STELLA":
        transformRef.current.setTransform(-50, -20, 1.2); // 👉 chỉnh theo vị trí thực tế
        break;
      case "THE HERITAGE":
        transformRef.current.setTransform(-200, -150, 1.3); // 👉 chỉnh theo vị trí thực tế
        break;
      case "THE OPERA":
        transformRef.current.setTransform(-300, -100, 1.2); // 👉 chỉnh theo vị trí thực tế
        break;
      default:
        break;
    }
  };

  // ✅ Khi load URL lần đầu → tự động pan
  useEffect(() => {
    if (!transformRef.current || !urlPhase) return;
    const timer = setTimeout(() => {
      panToPhase(urlPhase);
    }, 150); // chờ DOM render
    return () => clearTimeout(timer);
  }, [urlPhase]);

  // ✅ Khi click hoặc chọn từ Menu
  const handlePhaseChange = (newPhase: string) => {
    setCurrentPhase(newPhase);
    panToPhase(newPhase);
  };

  // ✅ Dữ liệu các phase vẽ SVG
  const phasePaths = [
    {
      name: "THE STELLA",
      fill: "rgba(237,155,0,0.3)",
      stroke: "#fcb814",
      textX: 300,
      textY: 500,
      d:"M-17924.682-22407.2l8,60.756,24,365.922s72-11.738,95.428-13.809,91.426,0,118.85,0,112.727,4.059,112.727,4.059,3.6-77.416,0-97.721-2.588-20.854-19.947-43.672-28.953-23.4-49.5-47.6-54.734-61.92-64.619-79.205-69.008-51.135-78.678-87.971-14.312-87.059-33.043-100.883-22.365,6.6-68.92,19.17-46.816,12.566-45.777,15.711A52.893,52.893,0,0,1-17924.682-22407.2Z",
    },
    {
      name: "THE MARINA",
      fill: "rgba(223,243,79,0.3)",
      stroke: "#fcb814",
      textX: 500,
      textY: 400,
      d:"M-17512.146-22037.592s20.844.529,45.215,3.162,38.471,3.557,38.471,3.557l1.645-16.605s6.123-86.529-1.645-117.043c-.2-.777-3.652-7.453-3.852-8.389-7.191-33.307,17.156-39.137,19.664-93.719,2.566-55.809-23.084-104.766-38.9-132.145s-8.98-90.557,8.551-122.672,5.264-29.969-4.275-42.121-24.6-44.422-25.256-70.342-16.9-33.051-16.9-33.051-32.633,9.344-44.777,10.281-48.57-9.346-59.955-31.467-19.986-25.547-48.318,16.2-44.271,26.168-73.617,62.307-36.687,93.135-36.184,101.232,17.2,31.775,21.76,48.289,13.15,76.637,19.98,81.309,63.707,59.6,76.859,79.539,45.914,63,54.266,69.537,55.855,54.457,57.881,59.939,10.908,34.143,9.389,85.857S-17512.146-22037.592-17512.146-22037.592Z",
    },
    {
      name: "THE HERITAGE",
      fill: "rgba(9,147,150,0.3)",
      stroke: "#fcb814",
      textX: 930,
      textY: 700,
      d:"M-17263.178-21948.709c19.229,1.926,74.057,10.281,108.141,20.846s163.438,59.164,166.5,60.75,7.865,6.338,7.865,6.338-2.184-14.26-7.865-24.3-19.229-46.648,0-61.623,45.447-33.992,79.969-19.729,42.387,21.129,49.816,7.4,3.061-24.83-31.025-44.373-51.129-73.955-39.766-100.367,6.553-30.111,6.553-30.111-280.111-103.006-285.355-104.592-38.146-.912-39.441,0,12.152,42.8,2.07,77.18-19.473,38.914-19.473,57.355,9.9,38.854,7.059,81.674S-17263.178-21948.709-17263.178-21948.709Z",
    },
    {
      name: "THE OPERA",
      fill: "rgba(9,150,51,0.3)",
      stroke: "#fcb814",
      textX: 950,
      textY: 400,
      d:"M-17263.8-22295.533c-2.615-.523-14.812-33.715-27.445-60.586s-21.779-36.875-16.117-70.59,30.055-81.664,31.363-81.135,39.641,7.379,58.811,20.02,39.645,30.559,60.553,31.084,106.293-33.717,123.719-34.771,38.77,10.539,88.432,49.521,126.334,89.563,151.6,138.559,8.277,66.377,8.277,66.377-59.246-26.867-82.334-18.963-58.373,55.314-62.73,64.271-285.338-102.207-298.842-103.787S-17261.184-22295-17263.8-22295.533Z",
    },
  ];

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
                 onPanningStop={(ref) => {
            const { positionX, positionY } = ref.state;
            console.log("📍 Vị trí sau khi kéo:", positionX, positionY);
          }}
        >
          <TransformComponent>
            <div className={styles.imageWrapper}>
              <Image src="/image/home_bg.png" alt="Ảnh" className={styles.img} />

              {phasePaths.map(({ name, fill, stroke, d, textX, textY }) => {
                const active = name === currentPhase;
                return (
                  <svg
                    key={name}
                    className={styles.overlaySvg}
                    xmlns="http://www.w3.org/2000/svg"
                    width="950"
                    height="730"
                    viewBox="0 0 1397.691 930.346"
                  >
                    <path
                      d={d}
                      transform="translate(17928.861 22706.727)"
                      fill={active ? fill : "none"}
                      stroke={active ? stroke : "none"}
                      strokeWidth={5}
                      className={styles.hoverablePath}
                      onClick={() => handlePhaseChange(name)}
                    />
                    {active && (
                      <text
                        x={textX}
                        y={textY}
                        fontSize="36"
                        fontWeight="bold"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        style={{
                          pointerEvents: "none",
                          fill: "red",
                          stroke: "white",
                          strokeWidth: 1,
                        }}
                      >
                        {name}
                      </text>
                    )}
                  </svg>
                );
              })}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>

      <div className={styles.right}>
        <Menu
          project_id={project_id}
          initialPhase={currentPhase}
          onPhaseChange={handlePhaseChange}
        />
      </div>
    </div>
  );
}
