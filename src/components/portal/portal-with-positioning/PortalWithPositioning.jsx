import "./portalWithPositioning.css";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PortalWithPositioning = ({ children, dismiss, anchorRef }) => {
  const [coordinates, setCoordinates] = useState({});

  const getCoordinates = () => {
    const rect = anchorRef.current.getBoundingClientRect();
    const coords = {
      left: rect.x + rect.width / 2, 
      top: rect.y, 
    };
    return coords;
  };

  const updateCoordinates = () => {
    console.log("updating cords");
    setCoordinates(getCoordinates());
  };

  const elRef = useRef(null);
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
    modalRoot.appendChild(elRef.current);
    window.addEventListener("scroll", updateCoordinates);
    window.addEventListener("resize", updateCoordinates);

    return () => {
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
        style={{ ...styles.popover, ...coordinates}}
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    elRef.current
  );
};

const styles = {
  popover: {
    position: "absolute",
    transform: "translate(-195px, 30%)",
  },
};

export { PortalWithPositioning };
