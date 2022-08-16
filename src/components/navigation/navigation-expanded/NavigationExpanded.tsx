import styles from "./NavigationExpanded.module.scss";
import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import { CSSProperties } from "react";

let activeStyle: CSSProperties = {
  textDecoration: "none",
  border: "2px solid yellow",
  color: "black",
  backgroundColor: "#fffd54",
};

let inactiveStyle: CSSProperties = {
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
          <div className={styles.navIcon}>
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
          <div className={styles.navIcon}>
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
          <div className={styles.navIcon}>
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
          <div className={styles.navIcon}>
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
          <div className={styles.navIcon}>
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
