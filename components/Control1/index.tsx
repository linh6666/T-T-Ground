"use client";

import { Image } from "@mantine/core";
import React from "react";
import styles from "./Control.module.css";
import Menu from "./Menu";

interface ControlPageProps {
  project_id: string | null;
}

export default function ControlPage({ project_id }: ControlPageProps) {
  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <Image
          src="/image/home_bg4.png"
          alt="Ảnh trang chủ"
          className={styles.img}
        />
      </div>

      <div className={styles.right}>
        {/* Truyền tiếp project_id sang Menu */}
        <Menu project_id={project_id} />
      </div>
    </div>
  );
}

