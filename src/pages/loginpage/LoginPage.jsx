import styles from "./LoginPage.module.css";
import logo from "../../assets/youtube.png";
import { useEffect, useState } from "react";
import { loginUser } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user: { token },
    status,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateData = () => {
    if (formData.email === "") {
      console.log("empty email");
      setFormData((prev) => ({ ...prev, error: "Email can't be empty." }));
      return false;
    }
    if (formData.password === "") {
      setFormData((prev) => ({
        ...prev,
        error: "Password field can't be empty.",
      }));
      return false;
    }
    return true;
  };
  const LoginHandler = (e) => {
    e.preventDefault();
    if (validateData()) {
      dispatch(loginUser(formData));
    }
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
            <Link to="/">
              <img src={logo} className={styles.navLogo}></img>
            </Link>
          </div>
          <div>
            <h1 className={styles.brandName}>YouTube</h1>
          </div>
        </div>
        <h1 className={styles.heading}>Log In</h1>
        {formData.error && <p className={styles.error}>{formData.error}</p>}
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
        <button
          type="submit"
          disabled={status === "loading" && true}
          className={styles.cta}
          onClick={LoginHandler}
        >
          Log In
        </button>
        <button className={styles.cta} onClick={fillGuestCredentials}>
          Use Guest Credentials
        </button>
        <Link className={styles.buttonLink} to="/signup">
          New to YouTube? Signup
        </Link>
      </form>
    </div>
  );
};

export { LoginPage };
