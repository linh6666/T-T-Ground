"use client";

import { Image, SimpleGrid } from "@mantine/core";

const images = [
  "/Millenia/1809 VIEW6.jpg",
 "/Millenia/1809 VIEW7.jpg",
 "/Millenia/1809 VIEW8.jpg",
 "/Millenia/BTSL_1.jpg",
  // 👉 Bạn chỉ cần thêm tiếp ảnh ở đây
];

export default function ListImage() {
  return (
    <SimpleGrid cols={4} spacing="md">
      {images.map((src, index) => (
        <Image
          key={index}
          radius="md"
          h={120}
          w="auto"
          fit="contain"
          src={src}
          alt={`image-${index}`}
        />
      ))}
    </SimpleGrid>
  );
}
