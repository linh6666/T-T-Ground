"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "@mantine/form";
import {
  Stack,
  Button,
  Title,
  Text,
  Box,
  Group,
  PasswordInput,
} from "@mantine/core";
import { useState } from "react";
import { api } from "../../libray/axios";
import { IconLock } from "@tabler/icons-react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

// 👇 định nghĩa kiểu response từ API reset password
interface ResetPasswordResponse {
  message: string;
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // 👈 lấy token từ URL
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: { new_password: "" },
    validate: {
      new_password: (value) =>
        value.length >= 8 ? null : "Mật khẩu phải có ít nhất 8 ký tự",
    },
  });

  // 👇 thêm state focus riêng để hiển thị label nhỏ
  const [passFocused, setPassFocused] = useState(false);

  const handleSubmit = async (values: { new_password: string }) => {
    try {
      setLoading(true);

      const response = await api.post<ResetPasswordResponse>(
        "/api/v1/reset-password",
        {
          token,
          new_password: values.new_password,
        }
      );

      console.log("✅ Reset thành công:", response.data);
      alert("Đổi mật khẩu thành công!");
      router.push("/dang-nhap");
    } catch (error: unknown) {
      const err = error as AxiosError<{ detail?: string }>;
      console.error("❌ Lỗi reset:", err.response?.data || err.message);
      alert("Đổi mật khẩu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maw={600}
      mx="auto"
      mt={100}
       p={30}
    
    >
  <Title order={2} ta="center" mb="md" style={{ color: '#762f0b' }}>
    🔒 Đặt lại mật khẩu
</Title>
      <Text size="sm" c="dimmed" ta="center" mb="lg">
        Nhập mật khẩu mới cho tài khoản của bạn
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {/* Ô mật khẩu với UI giống RegisterPage */}
          <Box mb="lg" style={{ position: "relative" }}>
            {(passFocused || form.values.new_password) && (
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
                Mật khẩu mới
              </Text>
            )}
            <PasswordInput
              placeholder={
                !passFocused && !form.values.new_password
                  ? "Nhập mật khẩu mới"
                  : ""
              }
              variant="unstyled"
              leftSection={<IconLock size={18} />}
              {...form.getInputProps("new_password")}
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

    

          <Group grow>
            <Button
              type="submit"
             
              loading={loading}
              style={{ backgroundColor: "#ffbe00",color: "#762f0b", }}
            >
              Đặt lại mật khẩu
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
}

