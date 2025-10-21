// src/app/chi-tiet/InteractiveClient.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ZoningSystem from "../../../components/DetailHome";

export default function InteractiveClient() {
  // Lấy project_id, zone, subzone, building_type_vi từ URL query
  const searchParams = useSearchParams();
  const project_id = searchParams.get("id");
  const zone = searchParams.get("zone");               // zone_vi
  const subzone = searchParams.get("subzone");         // subzone_vi (label)
  const building_type = searchParams.get("building_type"); // building_type_vi

  if (!project_id) return <div>Không có project_id trong URL</div>;
  if (!zone) return <div>Không có zone trong URL</div>;
  if (!subzone) return <div>Không có subzone trong URL</div>;
  if (!building_type) return <div>Không có building_type trong URL</div>;

  // ✅ Truyền cả 4 giá trị vào ZoningSystem
  return (
    <ZoningSystem
      project_id={project_id}
      zone={zone}
      subzone={subzone}
      building_type={building_type}
    />
  );
}

