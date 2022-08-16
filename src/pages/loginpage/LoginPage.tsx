import styles from "./LoginPage.module.scss";
import logo from "../../assets/youtube.png";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { loginUser } from "../../store/authSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  interface CustomizedState {
    from: {pathname:string}
  }
  const state = location.state as CustomizedState
  
  const from = state?.from?.pathname || "/";
  // const from = location.state?.from?.pathname || "/";

  const {
    user: { token },
    status,
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateData = () => {
    if (formData.email === "") {
      console.log("empty email");
      setError("Email can't be empty.");
      return false;
    }
    if (formData.password === "") {
      setError("Password field can't be empty.");
      return false;
    }
    return true;
  };
  const LoginHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateData()) {
      dispatch(loginUser(formData));
    }
  };
  const fillGuestCredentials = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData({
      email: "JaneDoe@example.com",
      password: "secretpassword",
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
        <h1 className={styles.heading}>
          Log In{from !== "/" && ` to view ${from.slice(1, from.length)}`}
        </h1>
        {error !== "" && <p className={styles.error}>{error}</p>}
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
