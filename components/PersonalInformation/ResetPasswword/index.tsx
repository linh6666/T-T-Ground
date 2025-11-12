import React, { useState } from "react";
import { Container, Title, Button, PasswordInput } from "@mantine/core";
import { NotificationExtension } from "../../../extension/NotificationExtension";

export default function ProfileInfo() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      NotificationExtension.Fails("Vui lòng đăng nhập để thực hiện hành động này.");
      return;
    }

    const response = await fetch("https://www.mohinhviet.com.vn/api/v1/users/me/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });

    if (response.ok) {
      NotificationExtension.Success("Đổi mật khẩu thành công!");
      // Reset password inputs
      setCurrentPassword("");
      setNewPassword("");
    } else {
      const errorData = await response.json();
      NotificationExtension.Fails(errorData.detail || "Không xác định");
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
      <Button color="#ffbe00"  onClick={handleChangePassword} style={{ color: '#762f0b' }}>Đổi mật khẩu</Button>
    </Container>
  );
}