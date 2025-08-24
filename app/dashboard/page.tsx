"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import Loading from "@/components/Loading/Loading";

const DashboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router?.push("/auth");
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <div className={styles.container}>
      {!loading && (
        <div className={styles.welcomeMessage}>
          <span>به پنل مدیریت وب سایت خوش آمدید.</span>
        </div>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default DashboardPage;
