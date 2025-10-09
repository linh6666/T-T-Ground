"use client";

import { Image } from "@mantine/core";
import React from "react";
import styles from "./Control.module.css";
import Menu from "./Menu/index"; 

export default function ControlPage() {
  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <Image
         src="/image/home_bg.png"   
          alt="Ảnh trang chủ"
          className={styles.img}
        />
      </div>
      <div className={styles.right}>
      <Menu/>
      </div>
    </div>
  );
}
