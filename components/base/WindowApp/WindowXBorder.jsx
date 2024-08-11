import React, { useEffect, useRef } from "react";

export const WindowXBorder = ({ resize }) => {
  const trpImg = useRef(null);

  useEffect(() => {
    trpImg.current = new Image(0, 0);
    trpImg.current.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    trpImg.current.style.opacity = 0;
  }, []);

  return (
    <div
      className="window-x-border border-transparent border-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      onDragStart={(e) => {
        e.dataTransfer.setDragImage(trpImg.current, 0, 0);
      }}
      onDrag={resize}
    ></div>
  );
};
