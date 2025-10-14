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
import System from './System'; 
import Permission from './Permission'; 
// import Projects from './Projects'; 
import RolePermission from './RolePermission'; 
import SystemPermission from './SystemPermission'; 
// import ProjectManagere from './ProjectManagere'; 
import HomeAdmin from '../HomeAdmin/index'; 

const mockdata = [
  { label: 'Báo cáo tổng quan', icon: IconGauge, link: 'home' },
  {
    label: 'Cấu hình',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
        { label: 'Cấu hình vai trò', link: 'role configuration' },
      { label: 'Định danh vai trò trong hệ thống', link: 'System' },
      { label: 'Định danh vai trò trong dự án', link: 'project' },
    ],
  },
  {
    label: 'Phân quyền',
    icon: IconUser,
    initiallyOpened: true,
    links: [{ label: 'Quản lý vai trò người dùng trong hệ thống', link: 'permission' },
      { label: 'Quản lý Permission', link: 'role_permission' },
      { label: 'Quản lý projects', link: 'system_permission' },
      { label: 'Quản lý RolePermission', link: 'user_project_role' },
      { label: 'Yều cầu SystemPermission ', link: 'join_project' },
    ],
  },
];



export default function PageAdmin() {
  const [active, setActive] = useState<string>(''); // <-- thêm state để xử lý active

  const combinedData = [...mockdata];

  // Hàm render nội dung tương ứng với menu
  const renderContent = () => {
    switch (active) {
      case 'System':
        return <System/>;
      case 'project':
        return <Roles/>;
      case 'permission':
        return <User/>;
      case 'role_permission':
        return <Permission/>;
      case 'system_permission':
        return <h1>xin chòa</h1>
        // <Projects/>;
      case 'user_project_role':
        return <RolePermission/>;
          case 'join_project':
        return <SystemPermission/>;
          case 'role configuration':
        return <SystemPermission/>;
         
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
