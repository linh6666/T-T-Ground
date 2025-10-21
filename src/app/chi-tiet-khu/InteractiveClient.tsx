// src/app/chi-tiet/InteractiveClient.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ZoningSystem from "../../../components/DetailZone";

export default function InteractiveClient() {
  // Lấy project_id, zone, subzone từ URL query
  const searchParams = useSearchParams();
  const project_id = searchParams.get("id");
  const zone = searchParams.get("zone");        // zone_vi
  const subzone = searchParams.get("subzone");  // subzone_vi (label)

  if (!project_id) return <div>Không có project_id trong URL</div>;
  if (!zone) return <div>Không có zone trong URL</div>;
  if (!subzone) return <div>Không có subzone trong URL</div>;

  // Truyền cả 3 giá trị vào ZoningSystem
  return (
    <ZoningSystem
      project_id={project_id}
      zone={zone}
      subzone={subzone}
    />
  );
}

