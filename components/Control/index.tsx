"use client";

import Image from "next/image";
import React from "react";
import styles from "./Control.module.css"; // ✅ import CSS Module

export default function ControlPage() {
  return (
    <div className={styles.container}>
      {/* Cột bên trái */}
      <div className={styles.leftColumn}>
        <Image
          src="https://vietmodel.com.vn/api/v1/static/EcoRetreat/home.jpg"
          alt="Ảnh trang chủ"
          width={1000}
          height={690}
          className={styles.responsiveImage}
        />
      </div>

      {/* Cột bên phải */}
      <div className={styles.rightColumn}>
        xin chào các bạn nhé
      </div>
    </div>
  );
}
