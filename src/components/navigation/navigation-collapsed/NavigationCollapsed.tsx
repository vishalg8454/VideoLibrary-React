import styles from "./NavigationCollapsed.module.scss";
import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import { CSSProperties } from "react";

let activeStyle:CSSProperties = {
  border: "2px solid yellow",
  color: "black",
  backgroundColor: "#fffd54",
};

let inactiveStyle:CSSProperties = {
    color: "#eeeeee",
}

const NavigationCollapsed = () => {
  return (
    <aside className={styles.navigationDrawer}>
      <ul className={styles.navigationItemList}>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          className={styles.navLink}
        >
          <HomeRoundedIcon
            className={styles.navigationIcon}
            sx={{ fontSize: 32 }}
          />
        </NavLink>

        <NavLink
          to="/playlist"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          className={styles.navLink}
        >
          <VideoLibraryRoundedIcon
            className={styles.navigationIcon}
            sx={{ fontSize: 32 }}
          />
        </NavLink>

        <NavLink
          to="/liked"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          className={styles.navLink}
        >
          <FavoriteRoundedIcon
            className={styles.navigationIcon}
            sx={{ fontSize: 32 }}
          />
        </NavLink>

        <NavLink
          to="/watch-later"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          className={styles.navLink}
        >
          <WatchLaterRoundedIcon
            className={styles.navigationIcon}
            sx={{ fontSize: 32 }}
          />
        </NavLink>

        <NavLink
          to="/history"
          style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          className={styles.navLink}
        >
          <HistoryRoundedIcon
            className={styles.navigationIcon}
            sx={{ fontSize: 32 }}
          />
        </NavLink>
      </ul>
    </aside>
  );
};

export { NavigationCollapsed };