import Input from "../../components/input/Input";
import styles from "./Login.module.css";

import { useState } from "react";

import { useLogin } from "../../hooks/auth/useLogin";
import { useGoogleSignIn } from "../../hooks/auth/useGoogleSignIn";

import Spinner from "../../components/loading-spinners/spinner/spinner";
import Error from "../../components/messages/error";

import eyePassword from "./../../assets/img/eye-password.png";
import eyeText from "./../../assets/img/eye-text.png";
import googleIcon from "./../../assets/img/google-logo.png";

export default function LogIn() {
  const [passwordType, setPasswordType] = useState("password");
  const [authData, setAuthData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const { email, password } = authData;
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
      console.log("SUCCESS");
    } else if (res.error) {
      console.log("ERROR", res.error);
      setError(res.error);
    }
  };

  const handleGoogleAuth = async () => {
    const res = await googleSignIn();
    if (res.ok) {
      console.log("SUCCESS");
    } else if (res.error) {
      console.log("ERROR", res.error);
      setError(res.error);
    }
  };

  return (
    <div className={styles["form-container"]}>
      <form
        className={styles["login-form"]}
        onSubmit={handleSubmit}
        spellCheck="false"
      >
        <div style={{ fontSize: "3rem", fontWeight: "600" }}>LogIn</div>
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
        {error && (
          <div style={{ display: "flex", alignItems: "stretch" }}>
            <Error error={error} />
            <button
              onClick={() => setError(null)}
              className={styles["errorCancelButton"]}
            >
              x
            </button>
          </div>
        )}
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
