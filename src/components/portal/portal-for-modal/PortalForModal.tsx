import {
  useEffect,
  useRef,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";
import { createPortal } from "react-dom";

type PortalForModalProps = {
  children: JSX.Element;
  dismiss: Dispatch<SetStateAction<boolean>>;
};

const PortalForModal = ({
  children,
  dismiss,
}: PortalForModalProps): JSX.Element => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !elRef.current) {
      return;
    }
    modalRoot.appendChild(elRef.current);
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={() => {
        dismiss((prevState) => !prevState);
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    elRef.current
  );
};
export { PortalForModal };
