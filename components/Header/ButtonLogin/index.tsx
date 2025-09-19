"use client";

import Link from "next/link";
import { IconUser } from "@tabler/icons-react";
import styles from "./ButtonLogin.module.css";

export default function LoginButton() {
  return (
    <Link href="/dang-nhap">
      <button type="button" className={styles.userBtn}>
        <IconUser size={20} />
      </button>
    </Link>
  );
}
