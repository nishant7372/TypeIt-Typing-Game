import Input from "../../components/input/Input";
import styles from "./../login/Login.module.css";

import { useState } from "react";

import { useSignup } from "../../hooks/auth/useSignup";
import { useGoogleSignIn } from "../../hooks/auth/useGoogleSignIn";
import { useMessageContext } from "../../hooks/context/useMessageContext";

import Spinner from "../../components/loading/spinner/spinner";

import eyePassword from "./../../assets/img/eye-password.png";
import eyeText from "./../../assets/img/eye-text.png";
import googleIcon from "./../../assets/img/google-logo.png";

export default function SignUp() {
  const [passwordType, setPasswordType] = useState("password");
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = authData;
  const { dispatch: messageDispatch } = useMessageContext();
  const { signup, isPending } = useSignup();
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
    const res = await signup(name, email, password);
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
    <div className={styles[`form-container`]}>
      <form
        className={styles["login-form"]}
        onSubmit={handleSubmit}
        spellCheck="false"
      >
        <h2>SignUp</h2>
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
          <div className={styles["rule"]}></div>
          <div>or</div>
          <div className={styles["rule"]}></div>
        </div>
        <label>
          <span>Name</span>
          <Input
            type="text"
            placeholder="Name"
            setState={handleInputChange}
            name="name"
            value={name}
            required={true}
            autoFocus={true}
          />
        </label>
        <label>
          <span>Email ID</span>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            setState={handleInputChange}
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
              name="password"
              setState={handleInputChange}
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
            <p>Creating Account...</p>
          </div>
        ) : (
          <button className={styles["login-btn"]}>SignUp</button>
        )}
      </form>
    </div>
  );
}
