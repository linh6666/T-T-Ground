'use client';
import { useState } from 'react';
import {
  IconGauge,
  IconNotes,
  IconUser,
} from '@tabler/icons-react';
import { ScrollArea } from '@mantine/core';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
import classes from './NavbarSimple.module.css';
import User from './User'; 
import Roles from './Roles'; 
// import System from './System'; 
// import Users from './Users'; 
// import ListProject from './ListProject'; 
// import UserProject from './UserPoject'; 
// import ProjectManagere from './ProjectManagere'; 
import HomeAdmin from '../HomeAdmin/index'; 

const mockdata = [
  { label: 'Báo cáo tổng quan', icon: IconGauge, link: 'home' },
  {
    label: 'Cấu hình',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Định danh vai trò trong hệ thống', link: 'user' },
      { label: 'Định danh vai trò trong dự án', link: 'project' },
    ],
  },
  {
    label: 'Phân quyền',
    icon: IconUser,
    initiallyOpened: true,
    links: [{ label: 'Quản lý vai trò người dùng trong hệ thống', link: 'permission' },
      { label: 'Quản lý vai trò ,quyền', link: 'role_permission' },
      { label: 'Quản lý quyền trong hệ thống', link: 'system_permission' },
      { label: 'Quản lý người dùng trong dự án', link: 'user_project_role' },
      { label: 'Yều cầu cấp quyền trong dự dự án ', link: 'join_project' },
    ],
  },
];



export default function PageAdmin() {
  const [active, setActive] = useState<string>(''); // <-- thêm state để xử lý active

  const combinedData = [...mockdata];

  // Hàm render nội dung tương ứng với menu
  const renderContent = () => {
    switch (active) {
      case 'user':
        return <User/>;
      case 'project':
        return <Roles/>;
      case 'permission':
        return <div>Đây là trang dự án</div>;
      case 'project-list':
        return <div>Đây là trang dự án</div>;
      case 'project-1':
        return <div>Đây là trang dự án</div>;
      case 'user-list':
        return <div>Đây là trang dự án</div>;
         
      default:
        return <HomeAdmin/>;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        maxWidth: '1500px',
        margin: '0px auto 10px auto',
        border:
          '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
      }}
    >
      {/* Sidebar */}
      <nav className={classes.navbar}>
        <div className={classes.header}>
          <h1>QUẢN TRỊ HỆ THỐNG</h1>
        </div>

        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>
            {combinedData.slice(0, mockdata.length).map((item) => (
              <LinksGroup
                {...item}
                key={item.label}
                active={active}
                onActiveChange={setActive} // truyền hàm để đổi nội dung khi click
              />
            ))}
          </div>

         
        </ScrollArea>
      </nav>

      {/* Phần nội dung hiển thị bên phải */}
      <div
        style={{ 
          flex: 1, 
          padding: 20, 
          overflowY: 'auto', 
          height: '800px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        className={classes.hidescrollbar}
      >
        {renderContent()}
      </div>
    </div>
  );
}
