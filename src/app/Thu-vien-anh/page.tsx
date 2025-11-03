import React from "react";
import { Metadata } from "next";

import ListImage from "../../../components/ListImage";
export const metadata: Metadata = {
  title: "Thư viện hình ảnh!",
  description: "Tìm hiểu chi tiết về dự án!",
};

export default function Interactive() {
  
  return (
    <>
      <ListImage />
    </>
  );
}