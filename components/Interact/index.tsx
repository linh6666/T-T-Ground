"use client";

import { useEffect, useState } from "react";
import { Card, Image, Stack, Text, Button, Loader, Modal } from "@mantine/core";
import styles from "./Interact.module.css";
import { getListProject } from "../../api/apigetlistProject"; // import API helper
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  address?: string | null;
  image_url?: string | null;
  investor?: string | null;
  project_template_id: string;
  rank?: number;
  timeout_minutes?: number;
  type?: string | null;
}

export default function DetailInteractive() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem("access_token") ?? "";

  if (!token) {
    setShowLoginModal(true);
    setLoading(false);
    return;
  }

  async function fetchProjects() {
    try {
      const { data } = await getListProject({ token, skip: 0, limit: 20 });
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchProjects();
}, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.cardGrid}>
            {projects.map((project) => (
              <Card
                key={project.id}
                shadow="sm"
                radius="md"
                withBorder
                padding="0"
                className={styles.card}
              >
                <Image
                  src={project.image_url || "/placeholder.png"}
                  height={160}
                  alt={project.name}
                  style={{
                    borderTopLeftRadius: "var(--mantine-radius-md)",
                    borderTopRightRadius: "var(--mantine-radius-md)",
                  }}
                />
                <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
                  <Text fw={500}>{project.name}</Text>
                  <Text size="sm" c="dimmed">
                    {project.address || "Địa chỉ chưa có"}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {project.type || "Thông tin chưa có"}
                  </Text>
                </Stack>
                <Button
                  component="a"
                  href={`/Detail/${project.project_template_id}`}
                  className={`${styles.baseButton} ${styles.primaryButton}`}
                >
                  Đi tới dự án
                </Button>
              </Card>
            ))}
          </div>

          <div className={styles.footerwrapper}>
            <p className={styles.footerline}>
              <span>Website được phát triển và hoàn thiện bởi</span>
              <Link href="https://www.mohinhviet.com/" target="_blank">
                <Image
                  src="/MHV_VN_SOLOGAN_H.png"
                  alt="Mô Hình Việt"
                  className={styles.footerlogo}
                 
                />
              </Link>
            </p>
            <p className={styles.footersubtex}>
              Đơn vị tiên phong trong lĩnh vực mô hình và giải pháp trình bày dự án bất động sản.
            </p>
          </div>
        </div>
      </div>

      {/* 🔒 Modal thông báo đăng nhập */}
      <Modal
        opened={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Thông báo"
        centered
          // withCloseButton={false}
      >
        <Text>Bạn cần đăng nhập để xem danh sách dự án.</Text>
      <Button
  mt="md"
  fullWidth
  onClick={() => (window.location.href = "/dang-nhap")}
  style={{
    backgroundColor: "#ffbe00",
    color: "#762f0b",
    fontWeight: 600,
  }}
>
  Đăng nhập ngay
</Button>
      </Modal>
    </>
  );
}
