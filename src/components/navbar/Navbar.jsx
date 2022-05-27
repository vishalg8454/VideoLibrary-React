import styles from "./Navbar.module.css";
import logo from "../../assets/youtube.png";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const Navbar = ({ onClick, device }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user: { token, firstName, lastName },
    status,
  } = useSelector((state) => state.auth);

  return (
    <nav className={styles.navContainer}>
      <div className={styles.navFlex}>
        {device !== "mobile" && (
          <div className={styles.navMenu} onClick={onClick}>
            <MenuRoundedIcon sx={{ fontSize: 32 }} />
          </div>
        )}
        <Link to="/">
          <img src={logo} className={styles.navLogo}></img>
        </Link>
        <h1 className={styles.brandName}>YouTube</h1>
      </div>
      {token ? (
        <button className={styles.ctaButton} onClick={() => dispatch(logout())}>
          Log Out
        </button>
      ) : (
        <button className={styles.ctaButton} onClick={() => navigate("/login")}>
          Login
        </button>
      )}
    </nav>
  );
};

export { Navbar };
