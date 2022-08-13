import "./portalWithPositioning.css";
import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  MutableRefObject,
  CSSProperties,
} from "react";
import { createPortal } from "react-dom";

type PortalWithPositioningProps = {
  children: ReactNode;
  dismiss: Dispatch<SetStateAction<boolean>>;
  anchorRef: MutableRefObject<HTMLDivElement | null>;
};

type Cordinate = {
  left: number;
  top: number;
};

const PortalWithPositioning = ({
  children,
  dismiss,
  anchorRef,
}: PortalWithPositioningProps) => {
  const [coordinates, setCoordinates] = useState<Cordinate>();

  const getCoordinates = () => {
    if (!anchorRef || !anchorRef.current) {
      return;
    }
    const rect = anchorRef.current.getBoundingClientRect();
    const coords = {
      left: rect.x + rect.width / 2,
      top: rect.y,
    };
    return coords;
  };

  const updateCoordinates = () => {
    setCoordinates(getCoordinates());
  };

  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const temp = getCoordinates();
    if (JSON.stringify(coordinates) != JSON.stringify(temp)) {
      setCoordinates(temp);
    }
  });

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !elRef.current) {
      return;
    }
    modalRoot.appendChild(elRef.current);
    window.addEventListener("scroll", updateCoordinates);
    window.addEventListener("resize", updateCoordinates);

    return () => {
      if (!modalRoot || !elRef.current) {
        return;
      }
      modalRoot.removeChild(elRef.current);
      window.removeEventListener("scroll", updateCoordinates);
      window.removeEventListener("resize", updateCoordinates);
    };
  }, []);

  return createPortal(
    <div
      className="modal-overlay"
      onClick={() => {
        dismiss((showModal) => !showModal);
      }}
    >
      <div
        style={{ ...styles, ...coordinates }}
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    elRef.current
  );
};

const styles: CSSProperties = {
  position: "absolute",
  transform: "translate(-195px, 30%)",
};

export { PortalWithPositioning };
