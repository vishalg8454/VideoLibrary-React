import styles from "./NavigationExpanded.module.css";
import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";

let activeStyle = {
  textDecoration: "none",
  border: "2px solid yellow",
  color: "black",
  backgroundColor: "#fffd54",
};

let inactiveStyle = {
  textDecoration: "none",
  color: "#eeeeee",
};

const NavigationExpanded = () => {
  return (
    <aside className={styles.navigationDrawer}>
      <ul className={styles.navigationItemList}>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          className={styles.navLink}
        >
          <div className={styles.k}>
            <HomeRoundedIcon
              className={styles.navigationIcon}
              sx={{ fontSize: 32 }}
            />
            <span className={styles.navLinkText}>Home</span>
          </div>
        </NavLink>

        <NavLink
          to="/playlist"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          className={styles.navLink}
        >
          <div className={styles.k}>
            <VideoLibraryRoundedIcon
              className={styles.navigationIcon}
              sx={{ fontSize: 32 }}
            />
            <span className={styles.navLinkText}>Playlist</span>
          </div>
        </NavLink>

        <NavLink
          to="/liked"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          className={styles.navLink}
        >
          <div className={styles.k}>
            <FavoriteRoundedIcon
              className={styles.navigationIcon}
              sx={{ fontSize: 32 }}
            />
            <span className={styles.navLinkText}>Liked</span>
          </div>
        </NavLink>

        <NavLink
          to="/watch-later"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          className={styles.navLink}
        >
          <div className={styles.k}>
            <WatchLaterRoundedIcon
              className={styles.navigationIcon}
              sx={{ fontSize: 32 }}
            />
            <span className={styles.navLinkText}>Wishlist</span>
          </div>
        </NavLink>

        <NavLink
          to="/history"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          className={styles.navLink}
        >
          <div className={styles.k}>
            <HistoryRoundedIcon
              className={styles.navigationIcon}
              sx={{ fontSize: 32 }}
            />
            <span className={styles.navLinkText}>History</span>
          </div>
        </NavLink>
      </ul>
    </aside>
  );
};

export { NavigationExpanded };
