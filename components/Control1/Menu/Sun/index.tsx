"use client";
import { Button, Group } from "@mantine/core";
import { IconMoonStars, IconSunHigh, IconSunset2 } from "@tabler/icons-react";
import React, { useState } from "react";

export default function Sun() {
  // chỉ lưu 1 trạng thái duy nhất: nút nào đang mở ("morning" | "afternoon" | "night" | null)
  const [active, setActive] = useState<string | null>(null);

  // Hàm xử lý click cho từng nút
  const handleClick = (button: string) => {
    // nếu click lại chính nó thì tắt, còn nếu click nút khác thì chuyển sang nút đó
    setActive((prev) => (prev === button ? null : button));
  };

  return (
    <>
      {/* Nút Sáng */}
      <Button
        onClick={() => handleClick("morning")}
        variant="filled"
        style={{
          width: active === "morning" ? 65 : 30,
          height: 30,
          padding: 0,
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: active === "morning" ? "space-around" : "center",
          overflow: "hidden",
          transition: "width 0.3s, background-color 0.3s",
          background:
            active === "morning"
              ? "linear-gradient(to top, #FFE09A, #FFF1D2)"
              : "#FFFAEE",
          border: "1.5px solid #752E0B",
        }}
      >
        <Group gap={active === "morning" ? 4 : 0} align="center">
          <IconSunHigh size={18} color="#752E0B" />
          {active === "morning" && <span style={{ color: "#752E0B" }}>Sáng</span>}
        </Group>
      </Button>

      {/* Nút Chiều */}
      <Button
        onClick={() => handleClick("afternoon")}
        variant="filled"
        style={{
          width: active === "afternoon" ? 65 : 30,
          height: 30,
          padding: 0,
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: active === "afternoon" ? "space-around" : "center",
          overflow: "hidden",
          transition: "width 0.3s, background-color 0.3s",
          background:
            active === "afternoon"
              ? "linear-gradient(to top, #FFE09A, #FFF1D2)"
              : "#FFFAEE",
          border: "1.5px solid #752E0B",
        }}
      >
        <Group gap={active === "afternoon" ? 4 : 0} align="center">
          <IconSunset2 size={18} color="#752E0B" />
          {active === "afternoon" && <span style={{ color: "#752E0B" }}>Chiều</span>}
        </Group>
      </Button>

      {/* Nút Tối */}
      <Button
        onClick={() => handleClick("night")}
        variant="filled"
        style={{
          width: active === "night" ? 60 : 30,
          height: 30,
          padding: 0,
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: active === "night" ? "space-around" : "center",
          overflow: "hidden",
          transition: "width 0.3s, background-color 0.3s",
          background:
            active === "night"
              ? "linear-gradient(to top, #FFE09A, #FFF1D2)"
              : "#FFFAEE",
          border: "1.5px solid #752E0B",
        }}
      >
        <Group gap={active === "night" ? 4 : 0} align="center">
          <IconMoonStars size={18} color="#752E0B" />
          {active === "night" && <span style={{ color: "#752E0B" }}>Tối</span>}
        </Group>
      </Button>
    </>
  );
}

