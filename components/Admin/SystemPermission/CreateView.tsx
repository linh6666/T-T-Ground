"use client";

import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Textarea,
  TextInput,
} from "@mantine/core";
import { isNotEmpty,  useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { createUser } from "../../../api/apicreateSystemPermission"; // 🔁 sửa đường dẫn nếu cần


interface CreateViewProps {
  onSearch: () => Promise<void>;
}

const CreateView = ({ onSearch }: CreateViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      system_id: "",
      permission_id: "",
      description_vi: "",
     
     
 
    },
    validate: {
      system_id: isNotEmpty("Mã không được để trống"),
      permission_id: isNotEmpty("Mã không được để trống"),
      description_vi: isNotEmpty("Mô tả không được để trống"),
      
     
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    open();
    try {
      const userData = {
        system_id: values.system_id,
           permission_id: values.permission_id, 
          description_vi: values.description_vi,
      
       
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
        label="Mã hệ thống"
        placeholder="Nhập Mã hệ thống"
        withAsterisk
        mt="md"
        {...form.getInputProps("system_id")}
      />

      <TextInput
        label="Mã Quyền"
        placeholder="Nhập Mã Quyền"
        withAsterisk
        mt="md"
        {...form.getInputProps("permission_id")}
      />
<Textarea
  label="Mô tả "
  placeholder="Nhập mô tả "
  autosize
  minRows={3}
  mt="md"
  {...form.getInputProps("description_vi")}
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
