"use client";

import { useState } from "react";
import { Modal, Text, Input, PasswordInput, Button, Box } from "@mantine/core";

interface ForgotPasswordModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({
  opened,
  onClose,
}: ForgotPasswordModalProps) {
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  const handleResetPassword = () => {
    console.log("Gửi yêu cầu reset mật khẩu cho:", resetEmail);
    console.log("Mật khẩu mới:", password);
    // gọi API reset password ở đây
    onClose(); // đóng modal sau khi gửi
  };

  return (
    <Modal opened={opened} onClose={onClose} title={<h1 style={{ color: "#762f0b" }}>Khôi phục mật khẩu</h1>} centered>
      <Text size="sm" mb="sm">
        Vui lòng nhập email và mật khẩu mới:
      </Text>
      
      {/* Ô nhập email */}
      <Box mb="lg" style={{ position: "relative" }}>
        {(emailFocused || resetEmail) && (
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
          placeholder={!emailFocused && !resetEmail ? "Nhập email" : ""}
          variant="unstyled"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.currentTarget.value)}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          styles={{
            input: {
              borderBottom: "1px solid #ccc",
              borderRadius: 0,
              padding: "8px 0",
            },
          }}
          mb="md"
        />
      </Box>

      {/* Ô nhập mật khẩu mới */}
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
            Nhập mật khẩu mới
          </Text>
        )}
        <PasswordInput
          placeholder={!passFocused && !password ? "Nhập mật khẩu mới" : ""}
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
          mb="md"
        />
      </Box>

      <Button
        fullWidth
        onClick={handleResetPassword}
        color="yellow"
        styles={{
          label: {
            color: "#762f0b", // đổi màu text ở đây
            fontWeight: 600, // có thể thêm đậm
          },
        }}
      >
        Gửi yêu cầu
      </Button>
    </Modal>
  );
}