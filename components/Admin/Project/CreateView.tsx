"use client";

import {
  Box,
  Button,
  FileInput,
  Group,
  LoadingOverlay,
  Select,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { createUser } from "../../../api/apiCreateProject";
import { getListProjectTemplates } from "../../../api/apiProjectTemplates"; // ✅ import sẵn

interface CreateViewProps {
  onSearch: () => Promise<void>;
}

interface Option {
  value: string;
  label: string;
}
interface ProjectTemplate {
  id: number;
  template_vi: string;
}
const CreateView = ({ onSearch }: CreateViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  // 👉 State lưu danh sách loại dự án
  const [systemOptions, setSystemOptions] = useState<Option[]>([]);

  const form = useForm({
    initialValues: {
      name_vi: "",
     
     
      project_template_id: "",
    },
    validate: {
      name_vi: isNotEmpty("Tên không được để trống"),
     
      project_template_id: isNotEmpty("Loại dự án không được để trống"),
    },
  });

  // ✅ Gọi API lấy danh sách loại dự án
  useEffect(() => {
    const fetchProjectTemplates = async () => {
      try {
        const token = localStorage.getItem("access_token") || "";
        const res = await getListProjectTemplates({ token });

        // Log để kiểm tra dữ liệu trả về
        console.log("Danh sách loại dự án:", res.data);

        // Map dữ liệu vào Select
     setSystemOptions(
  (res.data as ProjectTemplate[]).map((item) => ({
    value: item.id.toString(),
    label: item.template_vi || `Loại dự án ${item.id}`,
  })) || []
);

      } catch (error) {
        console.error("Lỗi khi lấy danh sách loại dự án:", error);
        setSystemOptions([]);
      }
    };

    fetchProjectTemplates();
  }, []);

  const handleSubmit = async (values: typeof form.values) => {
    open();
    try {
      const projectData = {
        name_vi: values.name_vi,
    
        project_template_id: values.project_template_id,
      };

      console.log("Payload gửi đi:", projectData);

      await createUser(projectData);
      await onSearch();
      modals.closeAll();
    } catch (error) {
      console.error("Lỗi khi tạo dự án:", error);
      alert("Đã xảy ra lỗi khi tạo dự án.");
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

      {/* ✅ Select loại dự án */}
      <Select
        label="Tên loại dự án"
        placeholder="Chọn loại dự án"
        data={systemOptions.length ? systemOptions : []}
        rightSection={<IconChevronDown size={16} />}
        mt="md"
        withAsterisk
        {...form.getInputProps("project_template_id")}
      />

      <TextInput
        label="Tên dự án"
        placeholder="Nhập Tên dự án"
        withAsterisk
        mt="md"
        {...form.getInputProps("name")}
      />

      <TextInput
        label="Cấp bậc"
        placeholder="Nhập Cấp bậc"
        withAsterisk
        mt="md"
        {...form.getInputProps("rank")}
      />

      <TextInput
        label="Loại dự án"
        placeholder="Nhập loại dự án"
        withAsterisk
        mt="md"
        {...form.getInputProps("type")}
      />

      <TextInput
        label="Địa chỉ"
        placeholder="Nhập địa chỉ"
        mt="md"
        {...form.getInputProps("address")}
      />

      <TextInput
        label="Chủ đầu tư"
        placeholder="Nhập tên chủ đầu tư"
        mt="md"
        {...form.getInputProps("investor")}
      />

      <FileInput
        label="Hình ảnh"
        placeholder="Chọn file hình ảnh"
        mt="md"
        {...form.getInputProps("image_url")}
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
