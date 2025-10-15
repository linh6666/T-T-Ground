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
import Project from './Project'; 
import RolePermission from './RolePermission'; 
import SystemPermission from './SystemPermission'; 
import Attributes from './Attributes'; 
import ProjectTemplates from './ProjectTemplates'; 
import UserProjectRole from './UserProjectRole'; 
import HomeAdmin from '../HomeAdmin/index'; 

const mockdata = [
  { label: 'Báo cáo tổng quan', icon: IconGauge, link: 'home' },
  {
    label: 'Cấu hình',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
        { label: 'Cấu hình chức năng trong hệ thống', link: 'permission' },
      { label: 'Định danh vai trò trong hệ thống', link: 'System' },
      { label: 'Cấu hình vai trò trong hệ thống', link: 'SystemPermission' },
      { label: 'Phân Quyền người dùng trong hệ thống', link: 'User' },
    ],
  },
  {
    label: 'Cấu hình dự án',
    icon: IconUser,
    initiallyOpened: true,
    links: [{ label: 'Định danh vai trò người trong dự án', link: 'Roles' },
      { label: 'Cấu hình vai trò trong dự án', link: 'RolePermission' },
      { label: 'Phân quyền người dùng trong dự án', link: 'UserProjectRole' },
      // { label: 'Quản lý RolePermission', link: 'user_project_role' },
      // { label: 'Yều cầu SystemPermission ', link: 'join_project' },
    ],
  },
    {
    label: 'Dự án',
    icon: IconNotes,
    initiallyOpened: true,
    links: [{ label: 'Tạo loại thuộc tính', link: 'Attributes' },
      { label: 'Tạo loại dự án', link: 'Project_Templates' },
      { label: 'Cấu hình loại dự án', link: 'Template_Attributes_Link' },
      { label: 'Tạo dự án', link: 'project' },
      { label: 'Tạo dữ liệu điều khiển ', link: 'Node_Attribute' },
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
      case 'Roles':
        return <Roles/>;
      case 'User':
        return <User/>;
      case 'permission':
        return <Permission/>;
      case 'system_permission':
        return <h1>xin chòa</h1>
        // <Projects/>;
      case 'RolePermission':
        return <RolePermission/>;
          case 'SystemPermission':
        return <SystemPermission/>;
          case 'UserProjectRole':
        return <UserProjectRole/>;
         case 'Attributes':
        return <Attributes/>;
         case 'Project_Templates':
        return <ProjectTemplates/>;
         case 'Template_Attributes_Link':
        return <h1>xin chòa</h1>
         case 'project':
        return <Project/>;
         case 'Node_Attribute':
        return <h1>xin chòa</h1>
         
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
