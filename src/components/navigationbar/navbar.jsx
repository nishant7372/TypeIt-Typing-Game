import styles from "./Navbar.module.css";

import { NavLink, Link } from "react-router-dom";

import { useLogout } from "../../hooks/auth/useLogout";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import NameLogo from "../logomaker/namelogo";

export default function NavBar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = async () => {
    const res = await logout();
    if (res.ok) {
      console.log("SUCCESS");
    } else if (res.error) {
      console.log("ERROR", res.error);
    }
  };

  return (
    <div className={`${styles["nav-container"]} ${styles["sticky"]}`}>
      <div className={styles["navbar"]}>
        <div className={styles["nav-left"]}>
          <Link to="/" className={styles["app-name"]}>
            TypeIt
          </Link>
        </div>

        {user ? (
          <>
            <div className={styles["nav-middle"]}></div>
            <div className={styles["nav-right-auth"]}>
              <Link to="/">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className={styles["avatar"]}
                  />
                ) : (
                  <NameLogo
                    logoStyle={{ width: "2.3rem", height: "3rem" }}
                    name={user.displayName}
                  />
                )}
              </Link>
              <div
                className={styles["log-btn"]}
                onClick={isPending ? null : handleLogout}
              >
                Logout
              </div>
            </div>
          </>
        ) : (
          <div className={styles["nav-right-noauth"]}>
            <NavLink to="/login" className={styles["log-btn"]}>
              LogIn
            </NavLink>
            <NavLink to="/signup" className={styles["log-btn"]}>
              SignUp
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
