// src/app/chi-tiet/InteractiveClient.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ZoningSystem from "../../../components/DetailHome";

export default function InteractiveClient() {
  // Lấy project_id, zone, subzone, building_type_vi từ URL query
  const searchParams = useSearchParams();
  const project_id = searchParams.get("id");
  const phase_vi = searchParams.get("phase");                 // zone_vi
  const subzone = searchParams.get("subzone");               // subzone_vi (label)
  const building_type = searchParams.get("building_type");   // building_type_vi

  if (!project_id) return <div>Không có project_id trong URL</div>;
  if (!phase_vi) return <div>Không có phase trong URL</div>;
  if (!subzone) return <div>Không có subzone trong URL</div>;
  if (!building_type) return <div>Không có building_type trong URL</div>;

  // ✅ Truyền cả 4 giá trị vào ZoningSystem
  return (
    <ZoningSystem
      project_id={project_id}
      zone={phase_vi}           // Sửa từ 'phase' -> 'phase_vi'
      subzone={subzone}
      building_type={building_type}
    />
  );
}

