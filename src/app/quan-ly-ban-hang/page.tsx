import React from "react";
import { Metadata } from "next";

import PageAdmin from "../../../components/AdminSell";
export const metadata: Metadata = {
  title: "Quản lý bán hàng T&T Groud",
  description: "Quản lý bán hàng  về T&T Groud",
};

export default function quanlybanhang() {
  
  return (
    <>
      <PageAdmin/>
    </>
  );
}
