"use client";

import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Container, Group } from '@mantine/core';

import classes from './FooterLinks.module.css';
import AppContainer from "../../common/AppContainer";
import Image from 'next/image';

export default function Footer() {
  return (
   
 <footer style={{ backgroundColor: "#ffbe00" }} className="text-white ">
       <AppContainer>

<div className={classes.footer}>
      <Container className={classes.inner}>
      <Image 
  src="/Logo T&T.png" 
  alt="Logo" 
  width={100} 
  height={28} 
/>

        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
       </AppContainer>
   
  
</footer>

  );
}
