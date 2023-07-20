import styles from "./linear.module.css";

export default function Linear({ action, style }) {
  // action -> className
  return (
    <div className={`${styles["linear"]} ${styles[action]}`} style={style}>
      <div className={styles["bounce1"]}></div>
      <div className={styles["bounce2"]}></div>
      <div className={styles["bounce3"]}></div>
    </div>
  );
}
