"use client";

import { useState } from "react";
import {
  Input,
  PasswordInput,
  Button,
  Anchor,
  Group,
  Box,
  Text,
  Title,
} from "@mantine/core";
import ForgotPasswordModal from "./ForgotPasswordModal/index";
import { loginUser } from "../../api/apiLogin"; // Đảm bảo rằng bạn đã import hàm loginUser
import axios from "axios";

export default function LoginPage() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password); // Gọi API

      if (response?.access_token) {
        localStorage.setItem("access_token", response.access_token);
        window.location.href = "/";
      } else {
        console.error("Sai tài khoản hoặc mật khẩu, vui lòng thử lại.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data?.detail || "Sai tài khoản hoặc mật khẩu");
      } else {
        console.error((error as Error).message || "Có lỗi xảy ra, vui lòng thử lại");
      }
    }
  };

  return (
    <>
      {/* Import modal */}
      <ForgotPasswordModal opened={opened} onClose={() => setOpened(false)} />

      <Box
        style={{
          maxWidth: 600,
          margin: "auto",
          marginTop: "100px",
          borderRadius: "10px",
          padding: "30px",
          background: "#fff",
        }}
      >
        <Title
          order={2}
          ta="center"
          mb="xl"
          style={{ fontWeight: 700, fontSize: "24px", color: "#762f0b" }}
        >
          Đăng nhập vào Hệ thống
        </Title>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <Box mb="lg" style={{ position: "relative" }}>
            {(emailFocused || username) && (
              <Text
                size="xs"
                c="dimmed"
                style={{
                  position: "absolute",
                  top: -10,
                  left: 0,
                  fontSize: "12px",
                }}
              >
                Nhập email
              </Text>
            )}
            <Input
              type="email"
              placeholder={!emailFocused && !username ? "Nhập email" : ""}
              variant="unstyled"
              value={username}
              onChange={(e) => setEmail(e.currentTarget.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              styles={{
                input: {
                  borderBottom: "1px solid #ccc",
                  borderRadius: 0,
                  padding: "8px 0",
                },
              }}
            />
          </Box>

          {/* Mật khẩu */}
          <Box mb="lg" style={{ position: "relative" }}>
            {(passFocused || password) && (
              <Text
                size="xs"
                c="dimmed"
                style={{
                  position: "absolute",
                  top: -10,
                  left: 0,
                  fontSize: "12px",
                }}
              >
                Nhập mật khẩu
              </Text>
            )}
            <PasswordInput
              placeholder={!passFocused && !password ? "Nhập mật khẩu" : ""}
              variant="unstyled"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              onFocus={() => setPassFocused(true)}
              onBlur={() => setPassFocused(false)}
              styles={{
                input: {
                  borderBottom: "1px solid #ccc",
                  borderRadius: 0,
                  padding: "8px 0",
                },
              }}
            />
          </Box>

          {/* Links phụ */}
          <Group justify="space-between" mb="md">
            <Anchor size="sm"></Anchor>
            <Anchor size="sm" style={{ cursor: "pointer" }} onClick={() => setOpened(true)}>
              Quên mật khẩu?
            </Anchor>
          </Group>

          {/* Button */}
          <Button
            type="submit"
            fullWidth
            size="md"
            color="#ffbe00"
            styles={{
              label: {
                color: "#762f0b", // đổi màu text ở đây
                fontWeight: 600, // có thể thêm đậm
              },
            }}
          >
            Đăng nhập
          </Button>

          <Text ta="center" mt="md">
            Bạn chưa có tài khoản?{" "}
            <Anchor href="/dang-ky" size="sm" c="red">
              Đăng ký ngay
            </Anchor>
          </Text>
        </form>
      </Box>
    </>
  );
}