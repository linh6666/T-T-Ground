import React from "react";
import { Metadata } from "next";

import PageRegister from "../../../components/Register";
export const metadata: Metadata = {
  title: "Đăng ký tài khoản vào hệ thống T&T Group",
  description: "Hãy đăng ký tài khoản của bạn để trải nghiệm hệ thống tốt nhất.",
};

export default function dangky() {
  
  return (
    <>
      <PageRegister/>
    </>
  );
}