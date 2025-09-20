"use client";

import { useState } from "react";
import {
  Input,
  PasswordInput,
  Button,
  Anchor,
  Box,
  Text,
  Title,
} from "@mantine/core";

export default function RegisterPage() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [fullnameFocused, setFullnameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ fullname, phone, email, password, confirmPass });
    // gọi API register ở đây
  };

  return (
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
      {/* Tiêu đề */}
      <Title
        order={2}
        ta="center"
        mb="xl"
         style={{ fontWeight: 700, fontSize: "24px", color: "#762f0b" }}
      >
        Đăng ký tài khoản vào Hệ thống
      </Title>

      <form onSubmit={handleSubmit}>
        {/* Họ và tên */}
        <Box mb="lg" style={{ position: "relative" }}>
          {(fullnameFocused || fullname) && (
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
              Họ và tên
            </Text>
          )}
          <Input
            placeholder={!fullnameFocused && !fullname ? "Họ và tên" : ""}
            variant="unstyled"
            value={fullname}
            onChange={(e) => setFullname(e.currentTarget.value)}
            onFocus={() => setFullnameFocused(true)}
            onBlur={() => setFullnameFocused(false)}
            styles={{
              input: {
                borderBottom: "1px solid #ccc",
                borderRadius: 0,
                padding: "8px 0",
              },
            }}
          />
        </Box>

        {/* Số điện thoại */}
        <Box mb="lg" style={{ position: "relative" }}>
          {(phoneFocused || phone) && (
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
              Số điện thoại
            </Text>
          )}
          <Input
            type="Number"
            placeholder={!phoneFocused && !phone ? "Số điện thoại" : ""}
            variant="unstyled"
            value={phone}
            onChange={(e) => setPhone(e.currentTarget.value)}
            onFocus={() => setPhoneFocused(true)}
            onBlur={() => setPhoneFocused(false)}
            styles={{
              input: {
                borderBottom: "1px solid #ccc",
                borderRadius: 0,
                padding: "8px 0",
              },
            }}
          />
        </Box>

        {/* Email */}
        <Box mb="lg" style={{ position: "relative" }}>
          {(emailFocused || email) && (
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
            placeholder={!emailFocused && !email ? "Nhập email" : ""}
            variant="unstyled"
            value={email}
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

        {/* Nhập lại mật khẩu */}
        <Box mb="lg" style={{ position: "relative" }}>
          {(confirmFocused || confirmPass) && (
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
              Nhập lại mật khẩu
            </Text>
          )}
          <PasswordInput
            placeholder={
              !confirmFocused && !confirmPass ? "Nhập lại mật khẩu" : ""
            }
            variant="unstyled"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.currentTarget.value)}
            onFocus={() => setConfirmFocused(true)}
            onBlur={() => setConfirmFocused(false)}
            styles={{
              input: {
                borderBottom: "1px solid #ccc",
                borderRadius: 0,
                padding: "8px 0",
              },
            }}
          />
        </Box>

        {/* Button */}
        <Button type="submit" fullWidth size="md" color="#ffbe00"  styles={{
    label: {
      color: "#762f0b", // đổi màu text ở đây
      fontWeight: 600, // có thể thêm đậm
    },
  }}>
          Đăng ký
        </Button>

        {/* Đăng nhập */}
        <Text ta="center" mt="md">
          Bạn đã có tài khoản?{" "}
          <Anchor href="/dang-nhap" size="sm" c="red">
            Đăng nhập ngay
          </Anchor>
        </Text>
      </form>
    </Box>
  );
}
