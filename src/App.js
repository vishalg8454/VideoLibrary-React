import styles from "./App.module.css";
import { Outlet } from "react-router-dom";
import {
  Navbar,
  NavigationCollapsed,
  NavigationExpanded,
  NavigationBottom,
} from "./components";
import { useMedia } from "./custom-hooks";
import { useState, useEffect } from "react";

function App() {
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
        <Navbar onClick={toggleNav} device={device}/>
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
