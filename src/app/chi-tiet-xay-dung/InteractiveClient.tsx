// src/app/chi-tiet/InteractiveClient.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ZoningSystem from "../../../components/Constructiondetails";

export default function InteractiveClient() {
  // 🔹 Lấy project_id, subzone_vi, building_type_vi, model_building_vi từ URL query
  const searchParams = useSearchParams();
  const project_id = searchParams.get("id");
  const subzone_vi = searchParams.get("subzone_vi"); // ← subzone_vi được truyền từ Menu
  const building_type_vi = searchParams.get("building_type_vi"); // ✅ thêm dòng này
  const model_building_vi = searchParams.get("model_building_vi"); // Thêm dòng này

  // 🔹 Kiểm tra dữ liệu bắt buộc
  if (!project_id) return <div>Không có project_id trong URL</div>;
  if (!subzone_vi) return <div>Không có subzone_vi trong URL</div>;
  if (!building_type_vi) return <div>Không có building_type_vi trong URL</div>;
  if (!model_building_vi) return <div>Không có model_building_vi trong URL</div>; // Kiểm tra model_building_vi

  // 🔹 Truyền cả 4 giá trị vào component ZoningSystem
  return (
    <ZoningSystem
      project_id={project_id}
      subzone_vi={subzone_vi}
      building_type_vi={building_type_vi} // ✅ truyền thêm vào đây
      model_building_vi={model_building_vi} // Truyền thêm model_building_vi vào đây
    />
  );
}