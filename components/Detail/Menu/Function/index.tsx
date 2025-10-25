"use client";
import { Button, Group, Text } from "@mantine/core";
import React, { useState } from "react";

export default function Sun() {
  const [active, setActive] = useState<"single" | "multi" | null>(null);

  const getButtonStyle = (isActive: boolean) => ({
    width: 83,
    height: 28,
    padding: 0,
    borderRadius: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: isActive
      ? "linear-gradient(to top, #FFE09A,#FFF1D2)"
      : "#FFFAEE",
    border: "1.5px solid #752E0B",
    color: "#752E0B",
    fontWeight: 600,
    fontSize: "10px",
    letterSpacing: "0.5px",
    transition: "all 0.25s ease",
    boxShadow: isActive ? "inset 0 0 6px rgba(117, 46, 11, 0.2)" : "none",
    cursor: "pointer",
  });

  const handleClick = (mode: "single" | "multi") => {
    setActive((prev) => (prev === mode ? null : mode));
  };

  return (
    <Group gap="md">
      <Button
        variant="filled"
        style={getButtonStyle(active === "single")}
        onClick={() => handleClick("single")}
        onMouseOver={(e) => {
          if (active !== "single")
            e.currentTarget.style.background =
              "linear-gradient(180deg, #FFF4D8 0%, #FFF9EB 100%)";
        }}
        onMouseOut={(e) => {
          if (active !== "single")
            e.currentTarget.style.background = "#FFFAEE";
        }}
      >
        <Text style={{ fontSize: "10px" }}>SINGLE MODE</Text>
      </Button>

      <Button
        variant="filled"
        style={getButtonStyle(active === "multi")}
        onClick={() => handleClick("multi")}
        onMouseOver={(e) => {
          if (active !== "multi")
            e.currentTarget.style.background =
              "linear-gradient(180deg, #FFF4D8 0%, #FFF9EB 100%)";
        }}
        onMouseOut={(e) => {
          if (active !== "multi")
            e.currentTarget.style.background = "#FFFAEE";
        }}
      >
        <Text style={{ fontSize: "10px" }}>MULTI MODE</Text>
      </Button>
    </Group>
  );
}
