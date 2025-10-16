"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import AppAction from "../../../common/AppAction";
import { modals } from "@mantine/modals";
import { getListTemplateAttributesLink } from "../../../api/apiTemplateAttributesLink";
import { getListProjectTemplates } from "../../../api/apiProjectTemplates"; // API khác để load Select
import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { Group, Select } from "@mantine/core";
import CreateView from "./CreateView";
import EditView from "./EditView";
import DeleteView from "./DeleteView";
import { IconChevronDown } from "@tabler/icons-react";

// 🔹 Interfaces
interface DataType {
  id: string;
  project_template_id: string;
  attribute_id: string;
}

interface ProjectTemplate {
  id: string | number;
  template_vi?: string;
  template_name?: string;
}

interface TemplateAttributeLink {
  id: string | number;
  project_template_id: string;
  attribute_id: string;
}

export default function LargeFixedTable() {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [templateId, setTemplateId] = useState<string>(""); // template được chọn
  const [templateOptions, setTemplateOptions] = useState<{ value: string; label: string }[]>([]); // danh sách dropdown

  const token = localStorage.getItem("access_token") || "";

  // ============================================================
  // 🔹 1️⃣ Gọi API lấy danh sách template
  // ============================================================
  const fetchTemplateList = useCallback(async () => {
    try {
      const res = await getListProjectTemplates({ token, skip: 0, limit: 100 });
      const data: ProjectTemplate[] = res.data || [];

      const options = data.map((item) => ({
        value: item.id.toString(),
        label: item.template_vi || item.template_name || `Template ${item.id}`,
      }));
      setTemplateOptions(options);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Lỗi khi load danh sách template:", errorMessage);
      setTemplateOptions([]);
    }
  }, [token]);

  useEffect(() => {
    fetchTemplateList();
  }, [fetchTemplateList]);

  // ============================================================
  // 🔹 2️⃣ Gọi API lấy dữ liệu bảng khi đã chọn template_id
  // ============================================================
  const fetchAttributes = useCallback(async () => {
    if (!templateId) return; // chỉ gọi khi có template_id
    setLoading(true);
    setError(null);

    try {
      const res = await getListTemplateAttributesLink({
        token,
        template_id: templateId,
        skip: 0,
        limit: 100,
      });
      const data: TemplateAttributeLink[] = res.data || [];

      const rows: DataType[] = data.map((item) => ({
        id: item.id.toString(),
        project_template_id: item.project_template_id,
        attribute_id: item.attribute_id,
      }));
      setData(rows);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError("Không thể tải dữ liệu bảng: " + errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [templateId, token]);

  useEffect(() => {
    fetchAttributes();
  }, [fetchAttributes]);

  // ============================================================
  // 🔹 3️⃣ Modal các thao tác CRUD
  // ============================================================
  const openModal = () => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Thêm mới</div>,
      children: <CreateView onSearch={fetchAttributes} />,
      size: "lg",
      radius: "md",
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });
  };

  const openEditUserModal = (record: DataType) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Chỉnh sửa</div>,
      children: <EditView id={record.id} onSearch={fetchAttributes} />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });
  };

  const openDeleteUserModal = (record: DataType) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Xóa</div>,
      children: <DeleteView idItem={[record.id]} onSearch={fetchAttributes} />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });
  };

  // ============================================================
  // 🔹 4️⃣ Cột bảng
  // ============================================================
  const columns: ColumnsType<DataType> = [
    {
      title: "Mẫu dự án",
      dataIndex: "project_template_id",
      key: "project_template_id",
      width: 100,
    },
    {
      title: "Thuộc tính",
      dataIndex: "attribute_id",
      key: "attribute_id",
      width: 100,
    },
    {
      title: "Hành Động",
      width: 60,
      fixed: "right",
      render: (record: DataType) => (
        <EuiFlexGroup wrap={false} gutterSize="s" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="documentEdit"
              aria-label="Chỉnh sửa"
              color="success"
              onClick={() => openEditUserModal(record)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="trash"
              aria-label="Xóa"
              color="danger"
              onClick={() => openDeleteUserModal(record)}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
  ];

  // ============================================================
  // 🔹 5️⃣ Render giao diện
  // ============================================================
  return (
    <>
      <Group
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Select
          label="Tên dự án mẫu"
          placeholder="Chọn dự án mẫu"
          data={templateOptions}
          value={templateId}
          onChange={(value) => setTemplateId(value || "")} // chọn thì gọi fetchAttributes
          rightSection={<IconChevronDown size={16} />}
          withAsterisk
          clearable
          mb="md"
        />
        <AppAction openModal={openModal} />
      </Group>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        bordered
        rowKey="id"
      />

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </>
  );
}
