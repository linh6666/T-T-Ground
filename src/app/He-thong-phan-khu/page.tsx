import React from "react";
import { Metadata } from "next";

import ZoningSystem from "../../../components/ZoningSystem";
export const metadata: Metadata = {
  title: "Hệ thống phân khu",
  description: "Tìm hiểu về hệ thống phân khu trong dự án bất động sản của chúng tôi.",
};

export default function Interactive() {
  
  return (
    <>
      <ZoningSystem />
    </>
  );
}