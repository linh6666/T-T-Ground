import React from "react";
import { Metadata } from "next";

import PageAdmin from "../../../components/Admin";
export const metadata: Metadata = {
  title: "Quản trị T&T Groud",
  description: "Quản trị  về T&T Groud",
};

export default function quantrihethong() {
  
  return (
    <>
      <PageAdmin/>
    </>
  );
}
