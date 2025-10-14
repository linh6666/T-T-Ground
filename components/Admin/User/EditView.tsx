"use client";

import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Switch,
  TextInput,
} from "@mantine/core";
import { useForm, } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useCallback, useRef } from "react";
import { API_ROUTE } from "../../../const/apiRouter";
import { api } from "../../../libray/axios";
import { CreateUserPayload } from "../../../api/apiEdituser";

interface EditViewProps {
  onSearch: () => Promise<void>;
  id: string;
}

const EditView = ({ onSearch, id }: EditViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);
  const form = useForm<CreateUserPayload>({
    initialValues: {
      email: "",
      full_name: "",
      is_active: false,
      is_superuser: false,
      phone: "",
      area_id: "",
      province_id: "",
      ward_id: "",
      introducer_id: "",
    },
    validate: {
      // email: isNotEmpty("Email không được để trống"),
      // full_name: isNotEmpty("Họ và tên không được để trống"),
      // phone: isNotEmpty("Số điện thoại không được để trống"),
    },
  });

  const formRef = useRef(form);

  /** Submit cập nhật user */
  const handleSubmit = async (values: CreateUserPayload) => {
    open();
    try {
      const url = API_ROUTE.UPDATE_USERNAME.replace("{user_id}", id);
      await api.patch(url, values);
      await onSearch();
      modals.closeAll();
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error);
      alert("Đã xảy ra lỗi khi cập nhật người dùng.");
    } finally {
      close();
    }
  };

  /** Lấy dữ liệu chi tiết user */
  const fetchUserDetail = useCallback(async () => {
    if (!id) return;
    open();
    try {
      const url = API_ROUTE.UPDATE_USERNAME.replace("{user_id}", id);
      const response = await api.get(url);
      const userData = response.data;

      formRef.current.setValues({
        email: userData.email || "",
        full_name: userData.full_name || "",
        is_active: userData.is_active || false,
        is_superuser: userData.is_superuser || false,
        phone: userData.phone || "",
        area_id: userData.area_id || "",
        province_id: userData.province_id || "",
        ward_id: userData.ward_id || "",
        introducer_id: userData.introducer_id || "",
      });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu user:", error);
      alert("Không thể tải thông tin người dùng.");
      modals.closeAll();
    } finally {
      close();
    }
  }, [id, open, close]);

  useEffect(() => {
    fetchUserDetail();
  }, [fetchUserDetail]);

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

      <TextInput
        label="Mã khu vực (area_id)"
        placeholder="Nhập area_id"
        mt="md"
        {...form.getInputProps("area_id")}
      />

      <TextInput
        label="Tỉnh (province_id)"
        placeholder="Nhập province_id"
        mt="md"
        {...form.getInputProps("province_id")}
      />

      <TextInput
        label="Phường (ward_id)"
        placeholder="Nhập ward_id"
        mt="md"
        {...form.getInputProps("ward_id")}
      />

      <TextInput
        label="Người giới thiệu (introducer_id)"
        placeholder="Nhập introducer_id"
        mt="md"
        {...form.getInputProps("introducer_id")}
      />

      <Switch
        label="Kích hoạt tài khoản (is_active)"
        mt="md"
        {...form.getInputProps("is_active", { type: "checkbox" })}
      />

      <Switch
        label="Quyền quản trị (is_superuser)"
        mt="md"
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

export default EditView;
