import { Outlet } from "react-router-dom";
import { Navbar, NavigationCollapsed, NavigationExpanded } from "./components";
import { useMedia } from "./custom-hooks";
import { useState, useEffect } from "react";

function App() {
  const view = useMedia(
    ["(min-width: 700px)", "(min-width: 500px)", "(min-width: 300px)"],
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
    <div>
      <Navbar onClick={toggleNav}/>
      {device === "desktop" ? <NavigationExpanded /> : <NavigationCollapsed />}
      <NavigationExpanded />
      <Outlet />
    </div>
  );
}

export default App;
