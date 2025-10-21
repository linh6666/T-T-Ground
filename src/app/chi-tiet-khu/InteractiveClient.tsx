"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ZoningSystem from "../../../components/DetailZone";

export default function InteractiveClient() {
  const searchParams = useSearchParams();
  const project_id = searchParams.get("id");
  const phase_vi = searchParams.get("phase");       // đúng với URL
  const subzone_vi = searchParams.get("subzone_vi");

  if (!project_id) return <div>Không có project_id trong URL</div>;
  if (!phase_vi) return <div>Không có phase trong URL</div>;
  if (!subzone_vi) return <div>Không có subzone_vi trong URL</div>;

  return (
    <ZoningSystem
      project_id={project_id}
      initialPhase={phase_vi}
      initialBuildingType={subzone_vi}
    />
  );
}
