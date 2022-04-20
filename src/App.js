import {Outlet} from "react-router-dom";
import {Navbar,NavigationCollapsed} from "./components";

function App() {
  return (
    <div>
      <Navbar />
      <NavigationCollapsed />
      <Outlet />
    </div>
  );
}

export default App;
