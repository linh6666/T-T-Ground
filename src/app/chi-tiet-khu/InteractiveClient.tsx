"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ZoningSystem from "../../../components/DetailZone";

export default function InteractiveClient() {
  // 🧭 Lấy project_id, phase_vi, subzone_vi từ URL
  const searchParams = useSearchParams();
  const project_id = searchParams.get("id");
  const phase_vi = searchParams.get("phase_vi");       // phase
  const subzone_vi = searchParams.get("subzone_vi");   // thay building_type bằng subzone_vi

  // ❌ Bảo vệ nếu thiếu param
  if (!project_id) return <div>Không có project_id trong URL</div>;
  if (!phase_vi) return <div>Không có phase_vi trong URL</div>;
  if (!subzone_vi) return <div>Không có subzone_vi trong URL</div>;

  // ✅ Truyền đúng prop sang ZoningSystem
  return (
    <ZoningSystem
      project_id={project_id}
      initialPhase={phase_vi}           // khớp prop bên ZoningSystem
      initialSubzoneType={subzone_vi}  // dùng subzone_vi
    />
  );
}
