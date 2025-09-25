"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "@mantine/form";
import {
  Stack,
  Button,
  Paper,
  Title,
  Text,
  PasswordInput,
  Divider,
  Group,
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
    <Paper
      shadow="lg"
      p="xl"
      radius="md"
      maw={420}
      mx="auto"
      mt={120} // 👈 margin-top
      withBorder
    >
      <Title order={2} ta="center" mb="md">
        🔒 Đặt lại mật khẩu
      </Title>
      <Text size="sm" c="dimmed" ta="center" mb="lg">
        Nhập mật khẩu mới cho tài khoản của bạn
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <PasswordInput
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            leftSection={<IconLock size={18} />}
            {...form.getInputProps("new_password")}
          />

          <Divider my="sm" />

          <Group grow>
            <Button
              type="submit"
              loading={loading}
              style={{ backgroundColor: "#294b61" }}
            >
              Đặt lại mật khẩu
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}

