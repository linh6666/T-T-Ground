import { Card, Image, Stack, Text, Button} from "@mantine/core";

import styles from "./Interact.module.css";
import AppContainer from "../../common/AppContainer";


export default function DetailInteractive () {
  return (
<AppContainer>
 <div className={styles.container}>
      {/* Search Section */}
   

     
      <div className={styles.cardGrid}>
    
       

     
        

        {/* Card 3 */}
        <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
          <Image
            src="https://img.heroui.chat/image/places?w=800&h=400&u=1"
            height={160}
            alt="Highrise Melbourne"
            style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
          />
          <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
            <Text fw={500}>ECO RETREAT</Text>
            <Text size="sm" c="dimmed">Long An</Text>
            <Text size="sm" c="dimmed">100%</Text>
          </Stack>
          <Button 
               component="a"
   href="/chi-tiet-du-an"
          className={`${styles.baseButton} ${styles.primaryButton}`}>


            Đi tới dự án
          </Button>
        </Card>

<Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
          <Image
            src="https://img.heroui.chat/image/places?w=800&h=400&u=8"
            height={160}
            alt="HIGHRISE MELBOURNE"
            style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
          />
          <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
            <Text fw={500}>HIGHRISE MELBOURNE</Text>
            <Text size="sm" c="dimmed">Melbourne</Text>
            <Text size="sm" c="dimmed">6%, bao gồm 24 tầng, hướng biển</Text>
          </Stack>
            <Button
      component="a"
   href="/Detail"
      className={`${styles.baseButton} ${styles.primaryButton}`}
  
    >
      Đi tới dự án
    </Button>
        </Card>








    {/* <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
          <Image
            src="https://img.heroui.chat/image/places?w=800&h=400&u=2"
            height={160}
            alt="Ecopark"
            style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
          />
          <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
            <Text fw={500}>THANH XUÂN VALLEY</Text>
            <Text size="sm" c="dimmed">Thung Lũng Thanh Xuân </Text>
            <Text size="sm" c="dimmed">8%</Text>
          </Stack>
          <Button
      component="a"
      href=" "
      className={`${styles.baseButton} ${styles.primaryButton}`}
     // Mở liên kết ở tab mới (nếu cần)
    >
    Đi tới dự án 
    </Button>
    </Card> */}

 <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
          <Image
            src="https://img.heroui.chat/image/places?w=800&h=400&u=2"
            height={160}
            alt="Park Hill"
            style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
          />
          <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
            <Text fw={500}>THANH XUÂN VALLEY</Text>
            <Text size="sm" c="dimmed">Thung Lũng Thanh Xuân</Text>
            <Text size="sm" c="dimmed">8%</Text>
          </Stack>
          <Button disabled className={`${styles.baseButton} ${styles.disabledButton}`}>
           
xin phê duyệt
          </Button>
        </Card>



      
    <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
          <Image
            src="https://img.heroui.chat/image/places?w=800&h=400&u=5"
            height={160}
            alt="Park Hill"
            style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
          />
          <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
            <Text fw={500}>SUN PREMIER VILLAGE PRIMAVERA</Text>
            <Text size="sm" c="dimmed">Nam Phú Quốc, Việt Nam</Text>
            <Text size="sm" c="dimmed">5%</Text>
          </Stack>
          <Button disabled className={`${styles.baseButton} ${styles.disabledButton}`}>
           
Chờ phê duyệt
          </Button>
        </Card>
        
      </div>
    </div>
</AppContainer>


   
  );
}