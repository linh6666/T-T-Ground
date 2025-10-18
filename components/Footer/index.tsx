"use client";

import { Text, Title, Box } from '@mantine/core';

import styles from './FooterLinks.module.css';
// import AppContainer from "../../common/AppContainer";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerOverlay} >
      
          
     

          {/* Thông tin công ty ở giữa */}
          <Box className={styles.company}>
            <Title order={5}>CÔNG TY CỔ PHẦN TẬP ĐOÀN T&T</Title>
               <Text>Phone: <strong>(+84) 24 7308 1616</strong></Text>
            <Text>31 - 33 Ngô Quyền, P. Cửa Nam, TP. Hà Nội, Việt Nam</Text>
         
           
          </Box>

      

       
      </div>
    </footer>
  );
}