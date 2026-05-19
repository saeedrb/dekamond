import styles from "./page.module.css";
import Home from "@/components/pages/Home/Home";

export default function Index() {
  return (
    <div className={styles.container}>
      <Home />
    </div>
  );
}
