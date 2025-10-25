"use client";

import {
  Anchor,
  Box,
  Button,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { registerUser } from "../../api/apiRegister";
import { NotificationExtension } from "../../extension/NotificationExtension";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import style from "./Register.module.css";

interface Register {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  area: string;
  province: string;
  ward: string;
  introducer: string;
  detal_address: string;
}

const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<Register>({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      area: "",
      province: "",
      ward: "",
      introducer: "",
      detal_address: "",
    },
    validate: {
      fullName: (value) =>
        value && value.trim() ? null : "Họ và tên không được để trống",
      phone: (value) =>
        /^\d{10}$/.test(value.trim()) ? null : "Số điện thoại nhập đúng 10 số!",
      password: (value) =>
        value && value.length >= 5 && value.length <= 100
          ? null
          : "Mật khẩu phải chứa từ 5 đến 100 kí tự",
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Email không hợp lệ",
      area: (value) => (value && value.trim() ? null : "Vui lòng nhập khu vực"),
      province: (value) => (value && value.trim() ? null : "Vui lòng nhập tỉnh/thành"),
      ward: (value) => (value && value.trim() ? null : "Vui lòng nhập phường/xã"),
      introducer: (value) =>
        value && value.trim() ? null : "Vui lòng nhập mã người giới thiệu",
      detal_address: (value) =>
        value && value.trim() ? null : "Vui lòng nhập địa chỉ chi tiết",
    },
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Floating labels
  const [clickName, setClickName] = useState(false);
  const floatingName = clickName || form.values.fullName.length > 0 || undefined;
  const [clickPhone, setClickPhone] = useState(false);
  const floatingPhone = clickPhone || form.values.phone.length > 0 || undefined;
  const [clickPassword, setClickPassword] = useState(false);
  const floatingPassword = clickPassword || form.values.password.length > 0 || undefined;
  const [clickEmail, setClickEmail] = useState(false);
  const floatingEmail = clickEmail || form.values.email.length > 0 || undefined;

  const [clickProvince, setClickProvince] = useState(false);
  const floatingProvince = clickProvince || form.values.province.length > 0 || undefined;
  const [clickWard, setClickWard] = useState(false);
  const floatingWard = clickWard || form.values.ward.length > 0 || undefined;
  const [clickIntroducer, setClickIntroducer] = useState(false);
  const floatingIntroducer = clickIntroducer || form.values.introducer.length > 0 || undefined;
  const [clickDetail, setClickDetail] = useState(false);
  const floatingDetail = clickDetail || form.values.detal_address.length > 0 || undefined;

  // Redirect after success
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        router.push("/dang-nhap");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, router]);

  const handleSubmit = async (values: Register) => {
    try {
      setLoading(true);
      setErrorMsg(null);
      setSuccessMsg(null);

      const res = await registerUser(
        values.fullName,
        values.email,
        values.phone,
        values.password,

        values.province,
        values.ward,
        values.introducer,
        values.detal_address
      );

      console.log("✅ Đăng ký thành công:", res);
      NotificationExtension.Success("Đăng ký thành công!");
      setSuccessMsg("Đăng ký thành công!");
    } catch (error: unknown) {
      console.error("❌ Lỗi đăng ký:", error);
      if (error instanceof Error) {
        setErrorMsg(error.message);
        NotificationExtension.Fails(error.message || "Có lỗi xảy ra khi đăng ký");
      } else {
        setErrorMsg("Có lỗi xảy ra khi đăng ký");
        NotificationExtension.Fails("Có lỗi xảy ra khi đăng ký");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className={style.registerPage}
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <Box className={style.container}>
        <Box className={style.topNavBar}>
          <Box className={style.navBarContainer}>
            <Box className={style.navBarTitle}>
              Đăng ký tài khoản vào Hệ thống
            </Box>
          </Box>
        </Box>

        <Box className={style.loginForm}>
          <Box className={style.formGroup}>
            {/* Full Name */}
            <div className={style.inputBox}>
              <TextInput
                label="Họ và tên"
                labelProps={{ "data-floating": floatingName }}
                withAsterisk
                mt="md"
                classNames={{ root: style.root, input: style.input, label: style.label }}
                onFocus={() => setClickName(true)}
                onBlur={() => setClickName(false)}
                {...form.getInputProps("fullName")}
              />
            </div>

            {/* Email */}
            <div className={style.inputBox}>
              <TextInput
                label="Email"
                labelProps={{ "data-floating": floatingEmail }}
                withAsterisk
                mt="md"
                type="email"
                classNames={{ root: style.root, input: style.input, label: style.label }}
                onFocus={() => setClickEmail(true)}
                onBlur={() => setClickEmail(false)}
                {...form.getInputProps("email")}
              />
            </div>

            {/* Phone */}
            <div className={style.inputBox}>
              <TextInput
                label="Số điện thoại"
                labelProps={{ "data-floating": floatingPhone }}
                withAsterisk
                type="number"
                mt="md"
                classNames={{ root: style.root, input: style.input, label: style.label }}
                onFocus={() => setClickPhone(true)}
                onBlur={() => setClickPhone(false)}
                {...form.getInputProps("phone")}
              />
            </div>

            {/* Password */}
            <div className={style.inputBox}>
              <PasswordInput
                label="Mật khẩu"
                labelProps={{ "data-floating": floatingPassword }}
                withAsterisk
                mt="md"
                classNames={{ root: style.root, input: style.input, label: style.label }}
                onFocus={() => setClickPassword(true)}
                onBlur={() => setClickPassword(false)}
                {...form.getInputProps("password")}
              />
            </div>

            {/* Area */}
           
            {/* Province */}
            <div className={style.inputBox}>
              <TextInput
                label="Tỉnh/Thành phố"
                labelProps={{ "data-floating": floatingProvince }}
                withAsterisk
                mt="md"
                classNames={{ root: style.root, input: style.input, label: style.label }}
                onFocus={() => setClickProvince(true)}
                onBlur={() => setClickProvince(false)}
                {...form.getInputProps("province")}
              />
            </div>

            {/* Ward */}
            <div className={style.inputBox}>
              <TextInput
                label="Phường/Xã"
                labelProps={{ "data-floating": floatingWard }}
                withAsterisk
                mt="md"
                classNames={{ root: style.root, input: style.input, label: style.label }}
                onFocus={() => setClickWard(true)}
                onBlur={() => setClickWard(false)}
                {...form.getInputProps("ward")}
              />
            </div>

            {/* Introducer */}
            <div className={style.inputBox}>
              <TextInput
                label="Mã người giới thiệu"
                labelProps={{ "data-floating": floatingIntroducer }}
                withAsterisk
                mt="md"
                classNames={{ root: style.root, input: style.input, label: style.label }}
                onFocus={() => setClickIntroducer(true)}
                onBlur={() => setClickIntroducer(false)}
                {...form.getInputProps("introducer")}
              />
            </div>

            {/* Detailed Address */}
            <div className={style.inputBox}>
              <TextInput
                label="Địa chỉ chi tiết"
                labelProps={{ "data-floating": floatingDetail }}
                withAsterisk
                mt="md"
                classNames={{ root: style.root, input: style.input, label: style.label }}
                onFocus={() => setClickDetail(true)}
                onBlur={() => setClickDetail(false)}
                {...form.getInputProps("detal_address")}
              />
            </div>
          </Box>
        </Box>

        {errorMsg && <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>}
        {successMsg && <p style={{ color: "green", marginTop: "10px" }}>{successMsg}</p>}

        <Button className={style.btn} type="submit" loading={loading}>
          Đăng ký
        </Button>

        <Text style={{ textAlign: "center", marginTop: "16px" }}>
          Bạn đã có tài khoản?{" "}
          <Anchor href="/dang-nhap" size="sm" c="red">
            Đăng nhập ngay
          </Anchor>
        </Text>
      </Box>
    </Box>
  );
};

export default RegisterForm;



