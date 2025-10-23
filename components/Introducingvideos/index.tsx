'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Container } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

export default function VideoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const project_id = searchParams.get('id');

  const handleBack = () => {
    if (!project_id) return;
    router.push(`/Dieu-khien?id=${project_id}`);
  };

  return (
    <Container style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginBottom: 20 }}>
        <iframe
          src="/video/MILLENNIA_new 16x9_0819.mp4" // hoặc link YouTube/Vimeo
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: 10,
          }}
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

      <Button
        onClick={handleBack}
        variant="filled"
        style={{
          width: 40,
          height: 40,
          padding: 0,
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          transition: "background 0.3s",
          background: "#FFFAEE",
          color: "#752E0B",
          border: "1.5px solid #752E0B",
        }}
      >
        <IconArrowLeft size={18} color="#752E0B" />
      </Button>
    </Container>
  );
}
