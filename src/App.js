import {Outlet} from "react-router-dom";
import {Navbar,NavigationCollapsed,NavigationExpanded} from "./components";

function App() {
  return (
    <div>
      <Navbar />
      {/* <NavigationCollapsed /> */}
      <NavigationExpanded />
      <Outlet />
    </div>
  );
}

export default App;
