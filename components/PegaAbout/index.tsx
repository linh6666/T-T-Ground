import { Card, Image, Stack, Text, Button} from "@mantine/core";
import styles from "./Interact.module.css";
import Link from "next/link";
// import AppContainer from "../../common/AppContainer";
export default function DetailInteractive () {
  return (
<div className={styles.background}>
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
            <Text fw={500}>Millenia City</Text>
            <Text size="sm" c="dimmed">Huyện Cần Giuộc-Tỉnh Long An</Text>
            <Text size="sm" c="dimmed"></Text>
          </Stack>
          <Button 
               component="a"
   href=""
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
            <Text fw={500}>Khu Dân cư Phước Thọ</Text>
            <Text size="sm" c="dimmed">Thành Phố Vĩnh Long</Text>
            <Text size="sm" c="dimmed"></Text>
          </Stack>
            <Button
      component="a"
   href="/Detail"
      className={`${styles.baseButton} ${styles.primaryButton}`}
    >
      Đi tới dự án
    </Button>

        </Card>
 <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
          <Image
            src="https://img.heroui.chat/image/places?w=800&h=400&u=2"
            height={160}
            alt="Park Hill"
            style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
          />
          <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
            <Text fw={500}>Times Square Đà Nẵng</Text>
            <Text size="sm" c="dimmed">Đà Nẵng</Text>
            <Text size="sm" c="dimmed"></Text>
          </Stack>
          {/* <Button disabled className={`${styles.baseButton} ${styles.disabledButton}`}>
           
xin phê duyệt
          </Button> */}
            <Button
      component="a"
   href="/Detail"
      className={`${styles.baseButton} ${styles.primaryButton}`}
    >
      Đi tới dự án
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
            <Text fw={500}>Khu đô thị mới Cà Mau</Text>
            <Text size="sm" c="dimmed">Cà Mau</Text>
            <Text size="sm" c="dimmed"></Text>
          </Stack>
          {/* <Button disabled className={`${styles.baseButton} ${styles.disabledButton}`}>           
Chờ phê duyệt
          </Button> */}
            <Button
      component="a"
   href="/Detail"
      className={`${styles.baseButton} ${styles.primaryButton}`}
    >
      Đi tới dự án
    </Button>
        </Card>       
      </div>

          <div className={styles.footerwrapper}>
            <p className={styles.footerline}>
              <span>Website được phát triển và hoàn thiện bởi</span>
              <Link href="https://www.mohinhviet.com/" target="_blank">
                <Image
                  src="/MHV_VN_SOLOGAN_H.png"
                  alt="Mô Hình Việt"
                  className={styles.footerlogo}
                 
                />
              </Link>
            </p>
            <p className={styles.footersubtex}>
              Đơn vị tiên phong trong lĩnh vực mô hình và giải pháp trình bày dự án bất động sản.
            </p>
          </div>
    </div>
</div>  
  );
}