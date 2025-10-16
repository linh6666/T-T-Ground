"use client";

import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";
import { useEffect, useCallback, useRef, useState } from "react";
import { API_ROUTE } from "../../../const/apiRouter";
import { api } from "../../../libray/axios";
import { CreateUserPayload } from "../../../api/apiUserProjectRole";
import { getListSystem } from "../../../api/apigetlistsystym";
import { getListRoles } from "../../../api/getlistrole";
import { getListUser } from "../../../api/apigetlistuse";
import { getListProject } from "../../../api/apigetlistProject";

interface EditViewProps {
  onSearch: () => Promise<void>;
  id: string;
}

interface Option {
  value: string;
  label: string;
}
interface SystemItem {
  id: number;
  name: string;
}

interface ProjectItem {
  id: number;
  name: string;
}

interface RoleItem {
  id: number;
  name: string;
}

interface UserItem {
  id: number;
  email: string;
}

const EditView = ({ onSearch, id }: EditViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  // ✅ State lưu dữ liệu các dropdown
  const [systemOptions, setSystemOptions] = useState<Option[]>([]);
  const [projectOptions, setProjectOptions] = useState<Option[]>([]);
  const [roleOptions, setRoleOptions] = useState<Option[]>([]);
  const [userOptions, setUserOptions] = useState<Option[]>([]);

  const form = useForm<CreateUserPayload>({
    initialValues: {
      system_id: "",
      project_id: "",
      user_id: "",
      role_id: "",
    },
  });

  const formRef = useRef(form);

  /** ✅ Submit cập nhật user */
  const handleSubmit = async (values: CreateUserPayload) => {
    open();
    try {
      const url = API_ROUTE.UPDATE_USERPROJECTROLE.replace("{role_id}", id);
      await api.put(url, values);
      await onSearch();
      modals.closeAll();
    } catch (error) {
      console.error("Lỗi khi cập nhật user:", error);
      alert("Đã xảy ra lỗi khi cập nhật người dùng.");
    } finally {
      close();
    }
  };

  /** ✅ Lấy dữ liệu chi tiết user */
  const fetchUserDetail = useCallback(async () => {
    if (!id) return;
    open();
    try {
      const url = API_ROUTE.UPDATE_USERPROJECTROLE.replace("{role_id}", id);
      const response = await api.get(url);
      const userData = response.data;

      formRef.current.setValues({
        system_id: userData.system_id?.toString() || "",
        project_id: userData.project_id?.toString() || "",
        user_id: userData.user_id?.toString() || "",
        role_id: userData.role_id?.toString() || "",
      });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu user:", error);
      alert("Không thể tải thông tin người dùng.");
      modals.closeAll();
    } finally {
      close();
    }
  }, [id, open, close]);

  /** ✅ Lấy danh sách hệ thống, dự án, vai trò, người dùng */
  const fetchDropdownData = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token") || "";

    const [systems, projects, roles, users] = await Promise.all([
  getListSystem({ token }) as Promise<{ data: SystemItem[] }>,
  getListProject({ token }) as Promise<{ data: ProjectItem[] }>,
  getListRoles({ token }) as Promise<{ data: RoleItem[] }>,
  getListUser({ token }) as Promise<{ data: UserItem[] }>,
]);


      // Hệ thống
      setSystemOptions(
        systems.data?.map((item) => ({
          value: String(item.id),
          label: item.name || `Hệ thống ${item.id}`,
        })) || []
      );

      // Dự án
      setProjectOptions(
        projects.data?.map((item) => ({
          value: String(item.id),
          label: item.name || `Dự án ${item.id}`,
        })) || []
      );

      // Vai trò
      setRoleOptions(
        roles.data?.map((item) => ({
          value: String(item.id),
          label: item.name || `Vai trò ${item.id}`,
        })) || []
      );

      // Người dùng (hiển thị email)
      setUserOptions(
        users.data?.map((item) => ({
          value: String(item.id),
          label: item.email || `User ${item.id}`,
        })) || []
      );
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu dropdown:", error);
    }
  }, []);

  /** ✅ Gọi API khi mở form sửa */
  useEffect(() => {
    fetchDropdownData();
    fetchUserDetail();
  }, [fetchDropdownData, fetchUserDetail]);

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

      {/* Hệ thống */}
      <Select
        label="Tên hệ thống"
        placeholder="Chọn hệ thống"
        data={systemOptions.length ? systemOptions : [{ value: "", label: "Đang tải..." }]}
        rightSection={<IconChevronDown size={16} />}
        mt="md"
        withAsterisk
        {...form.getInputProps("system_id")}
      />

      {/* Dự án */}
      <Select
        rightSection={<IconChevronDown size={16} />}
        label="Dự án"
        placeholder="Chọn dự án"
        data={projectOptions.length ? projectOptions : [{ value: "", label: "Đang tải..." }]}
        mt="md"
        {...form.getInputProps("project_id")}
      />

      {/* Người dùng */}
      <Select
        rightSection={<IconChevronDown size={16} />}
        label="Email người dùng"
        placeholder="Chọn người dùng"
        data={userOptions.length ? userOptions : [{ value: "", label: "Đang tải..." }]}
        mt="md"
        {...form.getInputProps("user_id")}
      />

      {/* Vai trò */}
      <Select
        rightSection={<IconChevronDown size={16} />}
        label="Vai trò"
        placeholder="Chọn vai trò"
        data={roleOptions.length ? roleOptions : [{ value: "", label: "Đang tải..." }]}
        mt="md"
        {...form.getInputProps("role_id")}
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
