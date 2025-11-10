import React, { useState } from "react";
import { Container, Title, Button, Text, PasswordInput } from "@mantine/core";

export default function ProfileInfo() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

 const handleChangePassword = async () => {
  const access_token = localStorage.getItem("access_token"); // Lấy token từ localStorage
  if (!access_token) {
    setMessage("Vui lòng đăng nhập để thực hiện hành động này.");
    return;
  }

  const response = await fetch("https://www.mohinhviet.com.vn/api/v1/users/me/password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`, // Thêm token ở đây
    },
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
    }),
  });

  if (response.ok) {
    setMessage("Đổi mật khẩu thành công!");
    // Reset password inputs
    setCurrentPassword("");
    setNewPassword("");
  } else {
    const errorData = await response.json();
    setMessage(`Lỗi: ${errorData.detail || "Không xác định"}`);
  }
};

  return (
    <Container size="sm" py="xl">
      <Title order={2} c="#762f0b" ta="center" mb="lg">
        Đổi mật khẩu tài khoản
      </Title>
      <PasswordInput
        placeholder="Mật khẩu hiện tại"
        value={currentPassword}
        onChange={(event) => setCurrentPassword(event.currentTarget.value)}
        mb="md"
      />
      <PasswordInput
        placeholder="Mật khẩu mới"
        value={newPassword}
        onChange={(event) => setNewPassword(event.currentTarget.value)}
        mb="md"
      />
      <Button onClick={handleChangePassword}>Đổi mật khẩu</Button>
      {message && <Text mt="md">{message}</Text>}
    </Container>
  );
}