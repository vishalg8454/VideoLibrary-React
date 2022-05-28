import logo from "../../assets/youtube.png";
import styles from "./SignupPage.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../../store/authSlice";

const SignupPage = () => {
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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    error: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateData = () => {
    if (formData.firstName === "") {
      console.log("empty first name");
      setFormData((prev) => ({ ...prev, error: "First Name can't be empty." }));
      return false;
    }
    if (formData.lastName === "") {
      console.log("empty last name");
      setFormData((prev) => ({ ...prev, error: "Last Name can't be empty." }));
      return false;
    }
    if (formData.email === "") {
      console.log("empty email");
      setFormData((prev) => ({ ...prev, error: "Email can't be empty." }));
      return false;
    }
    if (formData.password.length < 6) {
      setFormData((prev) => ({
        ...prev,
        error: "Password cannot be less than 6 characters.",
      }));
      return false;
    }
    if (formData.password !== formData.password2) {
      setFormData((prev) => ({ ...prev, error: "Passwords do not match." }));
      return false;
    }
    setFormData((prev) => ({ ...prev, error: null }));
    return true;
  };
  const SignupHandler = (e) => {
    e.preventDefault();
    if (validateData()) {
        dispatch(signupUser(formData));
    }
  };
  return (
    <div className={styles.signupContainer}>
      <form className={styles.signupForm}>
        <div className={styles.logoContainer}>
          <div>
            <img src={logo} className={styles.navLogo}></img>
          </div>
          <div>
            <h1 className={styles.brandName}>YouTube</h1>
          </div>
        </div>
        <h1 className={styles.heading}>Sign Up</h1>
        {formData.error && <p className={styles.error}>{formData.error}</p>}
        <label>
          <p className={styles.label}>First Name</p>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            className={styles.inputBox}
            placeholder="Enter first name"
            onChange={onChange}
            required
          />
        </label>
        <label>
          <p className={styles.label}>Last Name</p>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            className={styles.inputBox}
            placeholder="Enter last name"
            onChange={onChange}
          />
        </label>
        <label>
          <p className={styles.label}>Email Address</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            className={styles.inputBox}
            placeholder="Enter your email address"
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
            placeholder="Enter password"
            onChange={onChange}
          />
        </label>
        <label>
          <p className={styles.label}>Confirm Password</p>
          <input
            type="password"
            className={styles.inputBox}
            name="password2"
            value={formData.password2}
            placeholder="Confirm password"
            onChange={onChange}
          />
        </label>
        <button
          type="submit"
          disabled={status === "loading" && true}
          className={styles.cta}
          onClick={SignupHandler}
        >
          Create New Account
        </button>
        <Link className={styles.buttonLink} to="/login">
          Already having an account? SignIn
        </Link>
      </form>
    </div>
  );
};

export { SignupPage };
