"use client";

import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Select,

  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useCallback, useRef,  } from "react";
import { API_ROUTE } from "../../../const/apiRouter";
import { api } from "../../../libray/axios";
import { CreateUserPayload } from "../../../api/apiEditAttributes";

interface EditViewProps {
  onSearch: () => Promise<void>;
  id: string;
}

// interface SystemOption {
//   id: number; // hoặc string, tùy thuộc vào API của bạn
//   name: string;
// }

const EditView = ({ onSearch, id }: EditViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);
  // const [systemOptions, setSystemOptions] = useState<
  //   { value: string; label: string }[]
  // >([]);

  const form = useForm<CreateUserPayload>({
    initialValues: {
   label: "",
      data_type: "",
      parent_attribute_id: "",
      display_label_vi: "",
    },
    validate: {
      // label: (value) => (value ? null : " không được để trống"),
      // rank: (value) => (value ? null : "Cấp bậckhông được để trống"),
      // // description_en: (value) => (value ? null : "Mô tả thoại không được để trống"),
      // description_vi: (value) => (value ? null : "Mô tả không được để trống"),
    },
  });

  const formRef = useRef(form);

  /** Submit cập nhật user */
  const handleSubmit = async (values: CreateUserPayload) => {
    open();
    try {
      const url = API_ROUTE. UPDATE_ATTRIBUTES.replace("{attribute_id}", id);
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

  /** Lấy dữ liệu chi tiết user */
  const fetchUserDetail = useCallback(async () => {
    if (!id) return;
    open();
    try {
      const url = API_ROUTE. UPDATE_ATTRIBUTES.replace("{attribute_id}", id);
      const response = await api.get(url);
      const userData = response.data;

      formRef.current.setValues({
        label: userData.label || "",
        data_type: userData.data_type || "",
       parent_attribute_id: userData.parent_attribute_id || "",
       display_label_vi:userData.display_label_vi || "",
    
        
      });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu user:", error);
      alert("Không thể tải thông tin người dùng.");
      modals.closeAll();
    } finally {
      close();
    }
  }, [id, open, close]);

  /** Lấy danh sách chức vụ hệ thống */
  const fetchSystemOptions = useCallback(async () => {
    try {
      // const res = await api.get(API_ROUTE.GET_LIST_ROLES);
      // const rawData = Array.isArray(res.data) ? res.data : res.data.data;
      // const options = rawData.map((item: SystemOption) => ({
      //   value: item.id.toString(),
      //   label: item.name,
      // }));
      // setSystemOptions(options);
    } catch (error) {
      console.error("Lỗi khi load system options:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserDetail();
    fetchSystemOptions();
  }, [fetchUserDetail, fetchSystemOptions]);

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
             label="Định danh thuộc tính"
             placeholder="Nhập định danh thuộc tính"
             withAsterisk
             mt="md"
             {...form.getInputProps("label")}
           />
     
         <Select
       label="Kiểu dữ liệu"
       placeholder="Chọn kiểu dữ liệu"
       data={[
         { value: "bigint_value", label: "Số nguyên (bigint_value)" },
         { value: "float_value", label: "Số thực (float_value)" },
         { value: "text_vi_value", label: "Văn bản Tiếng Việt (text_vi_value)" },
         { value: "text_en_value", label: "Văn bản Tiếng Anh (text_en_value)" },
         { value: "boolean_Value", label: "Giá trị đúng/sai (boolean_Value)" },
         { value: "time_value", label: "Thời gian (time_value)" },
       ]}
       withAsterisk
       mt="md"
       {...form.getInputProps("data_type")}
     />
      <TextInput
             label="Tên hiển thị "
             placeholder="Nhập tên hiển thị "
             withAsterisk
             mt="md"
             {...form.getInputProps("display_label_vi")}
           />
            <TextInput
             label="Tên dữ liệu cha"
             placeholder="Nhập tên dữ liệu cha"
             withAsterisk
             mt="md"
             {...form.getInputProps("parent_attribute_id")}
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