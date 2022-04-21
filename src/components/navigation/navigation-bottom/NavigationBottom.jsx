import styles from "./NavigationBottom.module.css";
import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";

let activeStyle = {
    color: "#fffd54",
  };
  
  let inactiveStyle = {
      color: "#eeeeee",
  }

const NavigationBottom = () => {
  return (
    <nav className={styles.navBottom}>

      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        <HomeRoundedIcon
          sx={{ fontSize: 32 }}
        />
      </NavLink>

      <NavLink
        to="/playlist"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        <VideoLibraryRoundedIcon
          sx={{ fontSize: 32 }}
        />
      </NavLink>

      <NavLink
        to="/liked"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        <FavoriteRoundedIcon
          sx={{ fontSize: 32 }}
        />
      </NavLink>

      <NavLink
        to="/watch-later"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        <WatchLaterRoundedIcon
          sx={{ fontSize: 32 }}
        />
      </NavLink>

      <NavLink
        to="/history"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        <HistoryRoundedIcon
          sx={{ fontSize: 32 }}
        />
      </NavLink>
    </nav>
  );
};

export { NavigationBottom };
