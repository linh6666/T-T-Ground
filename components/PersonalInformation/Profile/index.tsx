"use client";

import {
  Avatar,
  Group,
  Paper,
  Stack,
  Text,
  Divider,
  Container,
  Title,
} from "@mantine/core";

interface User {
 email: string;
  full_name: string;
  phone: string;
  is_active: boolean;
  is_superuser:boolean;
area_id:string;
province_id:string;
ward_id:string;
introducer_id:string;
  creation_time: string;
  detal_address:string;
  
  last_login: string;
}

interface ProfileInfoProps {
  user: User;
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <Container size="sm" py="xl">
      <Title order={2} c="#762f0b" ta="center" mb="lg">
        Hồ sơ cá nhân
      </Title>

      <Paper shadow="md" p="xl" radius="md" withBorder>
        {/* Header */}
        <Group mb="md" justify="space-between">
          <Group>
            <Avatar src={null} alt={user.full_name} size={60} radius="xl" />
            <Stack gap={2}>
              <Text fw={600}>{user.full_name || "Chưa có"}</Text>
              <Text c="dimmed" fz="sm">
                {user.email}
              </Text>
            </Stack>
          </Group>
        </Group>

        <Divider mb="md" />

        {/* Info fields */}
        <Stack gap="sm">
          <Group justify="space-between">
            <Text c="dimmed">Tên:</Text>
            <Text>{user.full_name || "Chưa có"}</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">Email:</Text>
            <Text>{user.email}</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">SĐT:</Text>
            <Text>{user.phone || "Chưa có"}</Text>
          </Group>
         
            <Group justify="space-between">
        <Text c="dimmed">Quyền:</Text>
        <Text>
          {user.is_superuser
            ? "Admin"
            : user.is_active
            ? "User thường"
            : "Không xác định"}
        </Text>
      </Group>
       <Group justify="space-between">
            <Text c="dimmed">Khu vực:</Text>
            <Text>{user.area_id || "Chưa có"}</Text>
          </Group>
            <Group justify="space-between">
            <Text c="dimmed">Tỉnh/Thành phố:</Text>
            <Text>{user.province_id || "Chưa có"}</Text>
          </Group>
           <Group justify="space-between">
            <Text c="dimmed">Phường xã:</Text>
            <Text>{user.ward_id || "Chưa có"}</Text>
          </Group>
            <Group justify="space-between">
            <Text c="dimmed">Mã người giới thiệu:</Text>
            <Text>{user.introducer_id || "Chưa có"}</Text>
          </Group>
            <Group justify="space-between">
            <Text c="dimmed">Địa chỉ chi tiết:</Text>
            <Text>{user.detal_address || "Chưa có"}</Text>
          </Group>
       
        </Stack>
      </Paper>
    </Container>
  );
}
