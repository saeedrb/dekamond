"use client";
import Input from "@/components/Input/Input";
import styles from "./page.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@/components/Button/Button";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const getUser = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch(
        "https://randomuser.me/api/?results=1&nat=us"
      );
      return response.json();
    },
    enabled: false,
    gcTime: 0,
    staleTime: 0
  });
  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required("شماره موبایل الزامی است.")
        .matches(/^09\d{9}$/, "شماره موبایل نامعتبر است."),
    }),
    onSubmit: (values) => {
      console.log(values);
      getUser.refetch();
    },
  });

 useEffect(() => {
   if (getUser.isSuccess) {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(getUser?.data?.results[0]));
      formik.resetForm();
      router?.push('/dashboard')
    }
  }
 }, [getUser.isSuccess]);

  useEffect(() => {
    if (getUser.isError) {
      setError("در دریافت اطلاعات کاربر با مشکل مواجه شده ایم.");
    }
  }, [getUser.isError]);

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div>
          <span>به وب سایت ما خوش آمدید.</span>
        </div>
        <div>
          <span>برای ورود، لطفا شماره موبایل خود را وارد کنید.</span>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={formik.handleSubmit}>
          <Input
            placeholder="09123456789"
            value={formik.values.phone}
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.phone ? formik.errors.phone : ""}
          />
          <Button type="button" label="ورود" onClick={formik.handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
