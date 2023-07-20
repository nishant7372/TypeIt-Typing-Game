import styles from "./message.module.css";

export default function Successful({ successful, color }) {
  return (
    <div className={`${styles["successful"]} ${styles[color]}`}>
      <i className="fa-solid fa-circle-check"></i>
      {successful}
    </div>
  );
}
