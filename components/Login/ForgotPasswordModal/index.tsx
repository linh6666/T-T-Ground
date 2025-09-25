"use client";

import { useState } from "react";
import { Modal, Text, Input, Button, Box } from "@mantine/core";
import { sendPasswordResetEmail } from "../../../api/apiSendEmail";

interface ForgotPasswordModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({
  opened,
  onClose,
}: ForgotPasswordModalProps) {
  const [resetEmail, setResetEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);

const handleResetPassword = async () => {
  try {
    console.log("Gửi yêu cầu reset mật khẩu cho:", resetEmail);
    await sendPasswordResetEmail(resetEmail); // Gọi API gửi email
    alert("Yêu cầu khôi phục mật khẩu đã được gửi thành công. Vui lòng kiểm tra email.");

    setResetEmail(""); // ✅ reset ô input về rỗng
    setEmailFocused(false); // ✅ bỏ trạng thái focus label

    onClose(); // Đóng modal sau khi gửi
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu:", error);
    alert("Bạn chưa nhập Email hoặc Email không hợp lệ. Vui lòng thử lại.");
  }
};


  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<h1 style={{ color: "#762f0b" }}>Khôi phục mật khẩu</h1>}
      centered
    >
      <Text size="sm" mb="sm">
        Vui lòng nhập email để khôi phục mật khẩu:
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

      <Button
        fullWidth
        onClick={handleResetPassword}
        color="yellow"
        styles={{
          label: {
            color: "#762f0b", // Đổi màu text ở đây
            fontWeight: 600,
          },
        }}
      >
        Gửi yêu cầu 
      </Button>
    </Modal>
  );
}