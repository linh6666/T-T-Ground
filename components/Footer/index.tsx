"use client";

import { Text, Title, Group, Box } from '@mantine/core';

import styles from './FooterLinks.module.css';
// import AppContainer from "../../common/AppContainer";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerOverlay} >
        <Group style={{ alignItems: 'flex-start' }}>
          
          {/* Logo bên trái */}
          <Box className={styles.logo}>
            {/* <Image 
              src="/Logo/Logo_của_Tập_đoàn_T&T_Group.png" 
              alt="Logo T&T" 
              width={250} 
              height={200} 
            /> */}
          </Box>

          {/* Thông tin công ty ở giữa */}
          <Box className={styles.company}>
            <Title order={5}>CÔNG TY CỔ PHẦN TẬP ĐOÀN T&T</Title>
               <Text>Phone: <strong>(+84) 24 7308 1616</strong></Text>
            <Text>31 - 33 Ngô Quyền, P. Cửa Nam, TP. Hà Nội, Việt Nam</Text>
         
            {/* <Text>Fax: <strong>(+84) 24 3972 1775</strong></Text>
            <Text>
              Email: <Anchor href="mailto:info@ttgroup.com.vn" style={{ color: '#762f0b' }}>info@ttgroup.com.vn</Anchor>
            </Text>
            <Text>Copyright © T&T Group 2023</Text> */}
          </Box>

          {/* Danh sách liên kết bên phải */}
          {/* <Box className={styles.links}>
            <Text>Giới thiệu</Text>
            <Text>Tướng tác</Text>
            <Text>Quản lý bán hàng</Text>
            <Text>Liên hệ</Text>
          </Box> */}

        </Group>
      </div>
    </footer>
  );
}