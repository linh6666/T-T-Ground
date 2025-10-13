"use client";

import {
  Box,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, matchesField, useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { createUser } from "../../../api/apicreateuser"; // 🔁 sửa đường dẫn nếu cần

interface CreateViewProps {
  onSearch: () => Promise<void>;
}

const CreateView = ({ onSearch }: CreateViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      email: "",
      full_name: "",
      password: "",
      confirm_password: "",
      is_active: false,
      is_superuser: false,
      phone: "",
      area_id: "",
      province_id: "",
      ward_id: "",
      introducer_id: "",
    },
    validate: {
      email: isNotEmpty("Email không được để trống"),
      full_name: isNotEmpty("Họ và tên không được để trống"),
      phone: isNotEmpty("Số điện thoại không được để trống"),
      password: isNotEmpty("Mật khẩu không được để trống"),
      confirm_password: matchesField("password", "Mật khẩu không khớp"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    open();
    try {
      const userData = {
        email: values.email,
        is_active: values.is_active,
        is_superuser: values.is_superuser,
        full_name: values.full_name,
        phone: values.phone,
        area_id: values.area_id,
        province_id: values.province_id,
        ward_id: values.ward_id,
        introducer_id: values.introducer_id,
        password: values.password,
      };
      await createUser(userData);
      await onSearch();
      modals.closeAll();
    } catch (error) {
      console.error("Lỗi khi tạo user:", error);
      alert("Đã xảy ra lỗi khi tạo người dùng.");
    } finally {
      close();
    }
  };

  return (
    <Box
      component="form"
      miw={320}
      mx="auto"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <TextInput
        label="Email"
        placeholder="Nhập email"
        withAsterisk
        mt="md"
        {...form.getInputProps("email")}
      />

      <TextInput
        label="Họ và tên"
        placeholder="Nhập họ và tên"
        withAsterisk
        mt="md"
        {...form.getInputProps("full_name")}
      />

      <TextInput
        label="Số điện thoại"
        placeholder="Nhập số điện thoại"
        withAsterisk
        mt="md"
        {...form.getInputProps("phone")}
      />

     

      {/* 🆕 Các trường bổ sung */}
      <TextInput
        label=" Khu Vực"
        placeholder="Nhập khu vực"
        mt="md"
        {...form.getInputProps("area_id")}
      />

      <TextInput
        label="Tỉnh"
        placeholder="Nhập tỉnh"
        mt="md"
        {...form.getInputProps("province_id")}
      />

      <TextInput
        label=" Phường"
        placeholder="Nhập phường"
        mt="md"
        {...form.getInputProps("ward_id")}
      />

      <TextInput
        label="Mã Người Giới Thiệu"
        placeholder="Nhập Người giới thiệu"
        mt="md"
        {...form.getInputProps("introducer_id")}
      />
       <PasswordInput
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        withAsterisk
        mt="md"
        {...form.getInputProps("password")}
      />

      <PasswordInput
        label="Nhập lại mật khẩu"
        placeholder="Xác nhận mật khẩu"
        withAsterisk
        mt="md"
        {...form.getInputProps("confirm_password")}
      />
      {/* ✅ Hết phần bổ sung */}

      <Checkbox
        label="Hoạt động"
        mt="md"
        {...form.getInputProps("is_active", { type: "checkbox" })}
      />

      <Checkbox
        label="Là quản trị viên"
        mt="xs"
        {...form.getInputProps("is_superuser", { type: "checkbox" })}
      />

      <Group justify="flex-end" mt="lg">
        <Button
          type="submit"
          color="#3598dc"
          loading={visible}
          leftSection={<IconCheck size={18} />}
        >
          Lưu
        </Button>
        <Button
          variant="outline"
          color="black"
          type="button"
          loading={visible}
          onClick={() => modals.closeAll()}
          leftSection={<IconX size={18} />}
        >
          Đóng
        </Button>
      </Group>
    </Box>
  );
};

export default CreateView;
