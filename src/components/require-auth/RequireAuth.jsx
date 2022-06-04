import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const {
    user: { token },
  } = useSelector((store) => store.auth);

  const location = useLocation();
  if (token) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export { RequireAuth };
