import { Link } from "react-router-dom";
import styles from "./Home.module.css";

import typingImg from "./../../assets/img/typing.jpg";

export default function Home() {
  return (
    <div className={styles["container"]}>
      <Link className={styles["subContainer"]} to="/singlePlayer/practice">
        Single Player
      </Link>
      <Link className={styles["subContainer"]} to="/multiPlayer/match">
        Multi Player
      </Link>
      <img className={styles.backgroundImg} src={typingImg} alt="typing" />
    </div>
  );
}
