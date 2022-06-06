import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const RequireAuthToast = ({ children, message }) => {
  const {
    user: { token },
  } = useSelector((state) => state.auth);
  if (token) {
    return children;
  }
  toast.warning(message, {
    toastId: 44,
  });
  return null;
};

export { RequireAuthToast };
