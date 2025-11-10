"use client";

import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  MultiSelect,
  Switch,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { API_ROUTE } from "../../../const/apiRouter";
import { api } from "../../../libray/axios";
import { CreateUserPayload } from "../../../api/apiEdituser";
import { getListProvinces } from "../../../api/apigetlistaddress";
import { getWardsByProvince } from "../../../api/apigetlistProvinces";

interface EditViewProps {
  onSearch: () => Promise<void>;
  id: string;
}

interface Province {
  code: string;
  full_name_vi: string;
}

interface Ward {
  code: string;
  full_name_vi: string;
}

const EditView = ({ onSearch, id }: EditViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);
  const [provinceOptions, setProvinceOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [wardOptions, setWardOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const form = useForm<CreateUserPayload>({
    initialValues: {
      email: "",
      full_name: "",
      is_active: false,
      is_superuser: false,
      phone: "",
      province_id: [],
      ward_id: [],
     
    },
    validate: {
      // Add validation rules here if needed
    },
  });

  const formRef = useRef(form);

  /** Submit updated user data */
  const handleSubmit = async (values: CreateUserPayload) => {
    open();
    try {
      const url = API_ROUTE.UPDATE_USERNAME.replace("{user_id}", id);
      await api.patch(url, values);
      await onSearch();
      modals.closeAll();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user.");
    } finally {
      close();
    }
  };

  /** Fetch user details */
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
        province_id: userData.province_id ? [userData.province_id] : [],
        ward_id: userData.ward_id ? [userData.ward_id] : [],
        // introducer_id: userData.introducer_id || "",
      });
      setSelectedProvince(userData.province_id || null);
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Unable to load user information.");
      modals.closeAll();
    } finally {
      close();
    }
  }, [id, open, close]);

  useEffect(() => {
    fetchUserDetail();
  }, [fetchUserDetail]);

  /** Fetch the list of provinces */
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data: Province[] = await getListProvinces();
        const formatted = data.map((item) => ({
          value: item.code,
          label: item.full_name_vi,
        }));
        setProvinceOptions(formatted);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  /** Fetch wards based on selected province */
  useEffect(() => {
    if (selectedProvince) {
      const fetchWards = async () => {
        try {
          const data: Ward[] = await getWardsByProvince(selectedProvince);
          const formatted = data.map((item) => ({
            value: item.code,
            label: item.full_name_vi,
          }));
          setWardOptions(formatted);
        } catch (error) {
          console.error("Error fetching wards:", error);
          setWardOptions([]);
        }
      };
      fetchWards();
    } else {
      setWardOptions([]);
    }
  }, [selectedProvince]);

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

      <MultiSelect
        label="Tỉnh"
        placeholder="Chọn tỉnh"
        data={provinceOptions}
        mt="md"
        value={form.values.province_id.slice(-1)} // Only show 1 selection
        onChange={(value) => {
          const limited = value.slice(-1); // Keep only 1 selection
          setSelectedProvince(limited[0] || null);
          form.setFieldValue("province_id", limited);
          form.setFieldValue("ward_id", []); // Reset wards when province changes
        }}
      />

      <MultiSelect
        label="Phường"
        placeholder="Chọn phường"
        data={wardOptions}
        mt="md"
        value={form.values.ward_id.slice(-1)} // Only show 1 selection
        onChange={(value) => {
          const limited = value.slice(-1);
          form.setFieldValue("ward_id", limited);
        }}
      />

      <TextInput
        label="Người giới thiệu"
        placeholder="Nhập người giới thiệu"
        mt="md"
        {...form.getInputProps("introducer_id")}
      />

      <Switch
        label="Kích hoạt tài khoản"
        mt="md"
        {...form.getInputProps("is_active", { type: "checkbox" })}
      />

      <Switch
        label="Quyền quản trị"
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