import styles from "./Verify.module.css";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import { getAuth, sendEmailVerification } from "firebase/auth";

export default function Verify() {
  const sendMail = () => {
    const auth = getAuth();
    sendEmailVerification(auth.currentUser);
  };

  const { user } = useAuthContext();

  return (
    <div className={styles["verification-page"]}>
      <div className={styles["verification-box"]}>
        <h2>Please verify your email</h2>
        <div>You're almost there! An Email has been sent to {user.email}</div>
        <div>
          Just click on the link in that mail to complete your signup. If you
          don't see it, you need to check your spam folder.
        </div>
        <div> Still Can't find the mail?</div>
        <button className={styles["verify-button"]} onClick={sendMail}>
          Resend Email
        </button>
      </div>
    </div>
  );
}
