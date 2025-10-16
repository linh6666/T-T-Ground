"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import AppSearch from "../../../common/AppSearch";
import AppAction from "../../../common/AppAction";

import { modals } from "@mantine/modals";
import { getListRoles } from "../../../api/apiUserProjectRole";
import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { Group } from "@mantine/core";
import CreateView from "./CreateView";
import EditView from "./EditView";
import DeleteView from "./DeleteView";

interface DataType {
  id:string;
     system_id: string;
      project_id:string;
  user_id?: string;
  role_id?: string;
  // description_en: string;
}

export default function LargeFixedTable() {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
   console.error("Lỗi khi tải dữ liệu:", error); // ✅ thêm console.error(error)

  const token = localStorage.getItem("access_token") || "YOUR_TOKEN_HERE";

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError("⚠️ Không tìm thấy token. Vui lòng đăng nhập.");
      setLoading(false);
      return;
    }

    try {
      const result = await getListRoles({ token, skip: 0, limit: 100 });
      const users = result.data.map((user: DataType) => ({
   // ✅ map thêm id
   id:user.id,
        system_id: user.system_id,
        project_id: user.project_id,
        user_id: user.user_id,
        role_id:user.role_id,
        // description_en: user.description_en,
      }));
      setData(users);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Đã xảy ra lỗi khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ Hàm mở modal chỉnh sửa
  const openEditUserModal = (role: DataType) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Chỉnh sửa người dùng</div>,
      children: <EditView id={role.id} onSearch={fetchData} />, // ✅ đổi fetchRoles → fetchData
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });
  };

  // ✅ Định nghĩa cột bảng
  const columns: ColumnsType<DataType> = [
      { title: "Tên hệ thống", dataIndex: "system_id", key: "system_id", width: 30 },
    { title: "Dự án", dataIndex: "project_id", key: "project_id", width: 30 },
    { title: "Email người dùng", dataIndex: "user_id", key: "user_id", width: 90 },
    { title: "Vai trò", dataIndex: "role_id", key: "role_id", width: 100 },
    // { title: "Mô Tả (Tiếng Anh)", dataIndex: "description_en", key: "description_en", width: 100 },
    {
      title: "Hành Động",
      width: 30,
      fixed: "right",
      render: (user: DataType) => (
        <EuiFlexGroup wrap={false} gutterSize="s" alignItems="center">
          <EuiFlexItem grow={false}>
            {/* ✅ truyền đúng user vào onClick */}
            <EuiButtonIcon
              iconType="documentEdit"
              aria-label="Chỉnh sửa"
              color="success"
              onClick={() => openEditUserModal(user)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon iconType="trash" aria-label="Xóa" color="danger" onClick={() => openDeleteUserModal(user)} />
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
  ];

  // ✅ Modal thêm người dùng
  const openModal = () => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Thêm người dùng mới</div>,
      children: <CreateView onSearch={fetchData} />,
      size: "lg",
      radius: "md",
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });
  };

    const openDeleteUserModal = (role: DataType) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Xóa vai trò</div>,
      children: <DeleteView idItem={[role.id]} onSearch={fetchData} />,
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

  return (
    <>
      <Group style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <AppSearch />
        <AppAction openModal={openModal} />
      </Group>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        bordered
        rowKey="id" // ✅ thêm key cho mỗi hàng
      />

     
    </>
  );
}
