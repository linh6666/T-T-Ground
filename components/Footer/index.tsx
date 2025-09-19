"use client";

import { Text, Title, Group, Box, Anchor } from '@mantine/core';
import Image from 'next/image';
// import classes from './FooterLinks.module.css';
import AppContainer from "../../common/AppContainer";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#ffbe00", padding: '15px', color: '#000' }}>
      <AppContainer>
      
          <Group style={{ alignItems: 'flex-start' }}>
            
            {/* Logo bên trái */}
            <Box style={{ flex: '1 1 200px', marginBottom: '20px', textAlign: 'center' }}>
              <Image 
                src="/Logo T&T.png" 
                alt="Logo T&T" 
                width={250} 
                height={200} 
              />
            </Box>

            {/* Thông tin công ty ở giữa */}
            <Box style={{ flex: '2 1 300px',  fontSize: '8px', marginBottom: '20px', color: '#762f0b',  }}>
              <Title order={5}>CÔNG TY CỔ PHẦN TẬP ĐOÀN T&T</Title>
              <Text>31 - 33 Ngô Quyền, P. Cửa Nam, TP. Hà Nội, Việt Nam</Text>
              <Text>Phone: <strong>(+84) 24 7308 1616</strong></Text>
              <Text>Fax: <strong>(+84) 24 3972 1775</strong></Text>
              <Text>
                Email: <Anchor href="mailto:info@ttgroup.com.vn" style={{ color: '#762f0b' }}>info@ttgroup.com.vn</Anchor>
              </Text>
              <Text>Copyright © T&T Group 2023</Text>
            </Box>

            {/* Danh sách liên kết bên phải */}
            <Box style={{ flex: '1 1 200px',  fontSize: '8px', color: '#762f0b', }}>
              <Text>Giới thiệu</Text>
              <Text>Tướng tác</Text>
              <Text>Quản lý bán hàng</Text>
              <Text>Liên hệ</Text>
           
            </Box>

          </Group>
      
      </AppContainer>
    </footer>
  );
}