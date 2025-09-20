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
// Import your API function here
import { registerUser } from "../../api/apiRegister";

export default function RegisterPage() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const [fullnameFocused, setFullnameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call your API register function
    try {
      const response = await registerUser(fullname, phone, email, password);
      console.log("Registration successful:", response);
      
     
      // Optionally reset the form fields
      setFullname("");
      setPhone("");
      setEmail("");
      setPassword("");
    
    } catch (error) {
      console.error("Registration failed:", error);
     
    }
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
              Họ và tên
            </Text>
          )}
          <Input
            type="text"
            placeholder={!phoneFocused && !phone ? "Nhập họ và tên" : ""}
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
              Số điện thoại
            </Text>
          )}
          <Input
          type="number"
            placeholder={!passFocused && !password ? "Nhập số điện thoại" : ""}
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
              Email
            </Text>
          )}
          <Input
            type="email"
            placeholder={!fullnameFocused && !fullname ? "Nhập Email" : ""}
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
              Mật khẩu
            </Text>
          )}
          <PasswordInput
            type="text"
            placeholder={!emailFocused && !email ? "Nhập mật khẩu" : ""}
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
        {/* <Box mb="lg" style={{ position: "relative" }}>
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
        </Box> */}

        {/* Nhập lại mật khẩu */}
    

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