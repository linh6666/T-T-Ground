'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Container } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import styles from './VideoPage.module.css'; // Import CSS module

export default function VideoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const project_id = searchParams.get('id');

  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Dieu-khien?id=${project_id}`);
  };

  return (
    <Container className={styles.videoContainer}>
     <iframe
  className={styles.videoIframe}
  src="https://www.youtube.com/embed/KwxqLtMP4jk?autoplay=1&mute=1"
  title="Video giới thiệu"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
      <Button
        className={styles.backButton}
        onClick={handleBack}
        variant="filled"
      >
        <IconArrowLeft size={18} color="#752E0B" />
      </Button>
    </Container>
  );
}