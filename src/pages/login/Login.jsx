import Input from "../../components/input/Input";
import styles from "./Login.module.css";

import { useState } from "react";

import { useLogin } from "../../hooks/auth/useLogin";
import { useGoogleSignIn } from "../../hooks/auth/useGoogleSignIn";
import { useMessageContext } from "../../hooks/context/useMessageContext";

import Spinner from "../../components/loading/spinner/spinner";

import eyePassword from "./../../assets/img/eye-password.png";
import eyeText from "./../../assets/img/eye-text.png";
import googleIcon from "./../../assets/img/google-logo.png";

export default function LogIn() {
  const [passwordType, setPasswordType] = useState("password");
  const [authData, setAuthData] = useState({ email: "", password: "" });

  const { email, password } = authData;
  const { dispatch: messageDispatch } = useMessageContext();
  const { login, isPending } = useLogin();
  const { googleSignIn, isPending: googleSignInPending } = useGoogleSignIn();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showPassword = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.ok) {
      messageDispatch({ type: "SUCCESS", payload: res.ok });
    } else if (res.error) {
      messageDispatch({ type: "ERROR", payload: res.error });
    }
  };

  const handleGoogleAuth = async () => {
    const res = await googleSignIn();
    if (res.ok) {
      messageDispatch({ type: "SUCCESS", payload: res.ok });
    } else if (res.error) {
      messageDispatch({ type: "ERROR", payload: res.error });
    }
  };

  return (
    <div className={styles["form-container"]}>
      <form
        className={styles["login-form"]}
        onSubmit={handleSubmit}
        spellCheck="false"
      >
        <h2>LogIn</h2>
        {googleSignInPending ? (
          <div className={styles["disabled"]}>
            <Spinner />
            <p>Signing in...</p>
          </div>
        ) : (
          <div className={styles["google-signup"]} onClick={handleGoogleAuth}>
            <img
              className={styles["googleImg"]}
              src={googleIcon}
              alt="google"
            />
            Continue with Google
          </div>
        )}
        <div className={styles["seperator"]}>
          <div className={styles["rule"]} />
          <div>or</div>
          <div className={styles["rule"]} />
        </div>
        <label>
          <span>Email ID</span>
          <Input
            type="email"
            placeholder="Email"
            setState={handleInputChange}
            name="email"
            value={email}
            required={true}
            autoFocus={true}
          />
        </label>
        <label>
          <span>Password</span>
          <div className={styles["password-field"]}>
            <Input
              type={passwordType}
              placeholder="Password"
              setState={handleInputChange}
              name="password"
              value={password}
              required={true}
              autoFocus={true}
            />
            <div>
              <img
                src={passwordType === "password" ? eyePassword : eyeText}
                onClick={showPassword}
                alt="eye-toggle"
              />
            </div>
          </div>
        </label>
        {isPending ? (
          <div className={styles["disabled"]}>
            <Spinner />
            <p>Signing in...</p>
          </div>
        ) : (
          <button className={styles["login-btn"]}>LogIn</button>
        )}
      </form>
    </div>
  );
}
