import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import {
  Navbar,
  NavigationCollapsed,
  NavigationExpanded,
  NavigationBottom,
} from "./components";
import { useMedia } from "./custom-hooks";
import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylist } from "./store/playlistSlice";
import { fetchVideos } from "./store/videoSlice";
import {useAppDispatch,useAppSelector} from "./store/hooks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVideos());
  }, []);

  const {
    user: { token },
    status,
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchPlaylist({token:token}));
    }
  }, [token]);

  const view = useMedia(
    ["(min-width: 1000px)", "(min-width: 600px)", "(min-width: 400px)"],
    ["desktop", "tablet", "mobile"],
    "mobile"
  );

  const [device, setDevice] = useState("mobile");

  useEffect(() => {
    setDevice(view);
  }, [view]);

  const toggleNav = () => {
    device === "desktop" ? setDevice("tablet") : setDevice("desktop");
  };

  return (
    <div className={styles.app}>
      <div className={styles.nav}>
        <Navbar onClick={toggleNav} device={device} />
      </div>

      <div className={styles.aside}>
        {device === "desktop" ? (
          <NavigationExpanded />
        ) : device === "tablet" ? (
          <NavigationCollapsed />
        ) : null}
      </div>

      <div className={styles.main}>
        <Outlet />
      </div>

      <div className={styles.bottomNav}>
        {device === "mobile" && <NavigationBottom />}
      </div>
    </div>
  );
}

export default App;
