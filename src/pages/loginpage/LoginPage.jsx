import styles from "./LoginPage.module.css";
import logo from "../../assets/youtube.png";
import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const LoginHandler = (e) => {
    e.preventDefault();
  };
  const fillGuestCredentials = (e) => {
    e.preventDefault();
    setFormData({
      email: "adarshbalika@gmail.com",
      password: "adarshBalika123",
    });
  };
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm}>
        <div className={styles.logoContainer}>
          <div>
            <img src={logo} className={styles.navLogo}></img>
          </div>
          <div>
            <h1 className={styles.brandName}>YouTube</h1>
          </div>
        </div>
        <h1 className={styles.heading}>Log In</h1>
        <label>
          <p className={styles.label}>Email Address</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            className={styles.inputBox}
            placeholder="Enter your email"
            onChange={onChange}
          />
        </label>
        <label>
          <p className={styles.label}>Password</p>
          <input
            type="password"
            className={styles.inputBox}
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={onChange}
          />
        </label>
        <button type="submit" className={styles.cta} onClick={LoginHandler}>
          Log In
        </button>
        <button className={styles.cta} onClick={fillGuestCredentials}>
          Use Guest Credentials
        </button>
      </form>
    </div>
  );
};

export { LoginPage };
