"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import AppSearch from "../../../common/AppSearch";
import AppAction from "../../../common/AppAction";
import dayjs from "dayjs";
import { modals } from "@mantine/modals";
import { getListUser  } from "../../../api/apigetlistuse";
import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { Group } from "@mantine/core";
import CreateView from "./CreateView";
import EditView from "./EditView";
import DeleteView from "./DeleteView";

interface DataType {
  key: string;
  full_name: string;
  email: string;
  phone: string;
  is_active: boolean;
  is_superuser: boolean;
  area_id: string;
  province_id: string;
  ward_id: string;
  introducer_id: string;
  id: string;
  creation_time: string;
  last_login: string;
  last_logout: string;
}

export default function LargeFixedTable() {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      const result = await getListUser ({ token, skip: 0, limit: 100 });
      const users = result.data.map((user: DataType) => ({
        key: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        is_active: user.is_active,
        is_superuser: user.is_superuser,
        area_id: user.area_id,
        province_id: user.province_id,
        ward_id: user.ward_id,
        introducer_id: user.introducer_id,
        id: user.id,
        creation_time: user.creation_time,
        last_login: user.last_login,
        last_logout: user.last_logout,
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

  const openEditUserModal = (role: DataType) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Chỉnh sửa người dùng</div>,
      children: <EditView id={role.id} onSearch={fetchData} />,
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

  // ✅ Đưa columns vào trong component để dùng được openEditUserModal
  const columns: ColumnsType<DataType> = [
    { title: "Họ và Tên", dataIndex: "full_name", key: "full_name", width: 150, fixed: "left" },
    { title: "Email", dataIndex: "email", key: "email", width: 130 },
    { title: "Điện Thoại", dataIndex: "phone", key: "phone", width: 130 },
    { title: "Kích Hoạt", dataIndex: "is_active", key: "is_active", width: 80, render: (text) => (text ? "Có" : "Không") },
    { title: "Quản Trị Viên", dataIndex: "is_superuser", key: "is_superuser", width: 100, render: (text) => (text ? "Có" : "Không") },
    { title: "Mã Khu Vực", dataIndex: "area_id", key: "area_id", width: 80 },
    { title: "Mã Tỉnh", dataIndex: "province_id", key: "province_id", width: 100 },
    { title: "Mã Phường", dataIndex: "ward_id", key: "ward_id", width: 100 },
    { title: "Mã Người Giới Thiệu", dataIndex: "introducer_id", key: "introducer_id", width: 120 },
    {
      title: "Thời Gian Tạo",
      dataIndex: "creation_time",
      key: "creation_time",
      width: 140,
      render: (text: string) => dayjs(text).format("DD/MM/YYYY HH:mm"),
    },
    { title: "Lần Đăng Nhập Cuối", dataIndex: "last_login", key: "last_login", width: 140 },
    { title: "Lần Đăng Xuất Cuối", dataIndex: "last_logout", key: "last_logout", width: 140 },
    {
      title: "Hành Động",
      width: 100,
      fixed: "right",
   render: (record: DataType) => (
        <EuiFlexGroup wrap={false} gutterSize="s" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="documentEdit"
              aria-label="Chỉnh sửa"
              color="success"
              onClick={() => openEditUserModal(record)} // ✅ đã fix
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
        scroll={{ x: 2000 }}
        pagination={false}
        bordered
      />

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </>
  );
}
