import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const {
    user: { token },
  } = useAppSelector((store) => store.auth);

  const location = useLocation();
  if (token) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export { RequireAuth };
