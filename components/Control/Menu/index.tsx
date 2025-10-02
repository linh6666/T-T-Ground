"use client";

import React, { useState } from "react";
import styles from "./Menu.module.css";
import { Button, Image, SimpleGrid } from "@mantine/core";
import { IconChevronsLeft } from "@tabler/icons-react";

export default function ControlPage() {
  const [activeMode, setActiveMode] = useState<'single' | 'multi' | null>(null);

  const handleModeChange = (mode: 'single' | 'multi') => {
    if (activeMode === mode) {
      setActiveMode(null); // toggle bỏ chọn
    } else {
      setActiveMode(mode);
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.logo}>
        <Image src="/Logo T&T.png" alt="Logo" className={styles.imgea} />
      </div>

      <div className={styles.Function}>
        <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs">
            <Button className={styles.btn}>Green Ville 1</Button>
      <Button className={styles.btn}>Green Ville 2</Button>
      <Button className={styles.btn}>Green Ville 3</Button>
      <Button className={styles.btn}>Green Ville 4</Button>
      <Button className={styles.btn}>Green Ville 5</Button>
      </SimpleGrid>
      </div>

    <div className={styles.footer}>
  {/* Hàng 1 */}
  <div className={styles.modeRow}>
    <button
      className={`${styles.modeBtn} ${activeMode === 'single' ? styles.active : ''}`}
      onClick={() => handleModeChange('single')}
    >
      SINGLE MODE
    </button>
    <button
      className={`${styles.modeBtn} ${activeMode === 'multi' ? styles.active : ''}`}
      onClick={() => handleModeChange('multi')}
    >
      MULTI MODE
    </button>
  </div>

  {/* Hàng 2 */}
  <div className={styles.controlRow}>
    <Button className={styles.circleBtn}>ON</Button>
    <Button className={styles.circleBtn}>OFF</Button>
    <Button className={styles.circleBtn}><IconChevronsLeft/>
</Button>
  </div>
</div>
    </div>
  );
}
