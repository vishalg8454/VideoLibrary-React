import { useAppSelector } from "../../store/hooks";
import { toast } from "react-toastify";
import { ReactNode } from "react";

interface RequireAuthToastProps {
  children: JSX.Element;
  message: string;
}

const RequireAuthToast = ({ children, message }: RequireAuthToastProps) => {
  const {
    user: { token },
  } = useAppSelector((state) => state.auth);
  if (token) {
    return children;
  }
  toast.warning(message, {
    toastId: 44,
  });
  return null;
};

export { RequireAuthToast };
