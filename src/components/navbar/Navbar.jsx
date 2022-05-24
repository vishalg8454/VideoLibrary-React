import styles from "./Navbar.module.css";
import logo from "../../assets/youtube.png";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Link } from "react-router-dom";

const Navbar = ({ onClick, device }) => {
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
      <button className={styles.ctaButton}>Login</button>
    </nav>
  );
};

export { Navbar };
