
import React from "react";
import { Metadata } from "next";

import  ControlAbout from "../../../components/Control";
export const metadata: Metadata = {
  title: "Điều khiển mô hình",
  description: "Điều khiển mô hình  cho dự án",
};

export default function Interactive() {
  
  return (
    <>
      <ControlAbout />
    </>
  );
}
