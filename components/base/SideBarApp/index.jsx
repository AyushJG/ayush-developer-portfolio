import React, { useState } from "react";

const SideBarApp = (props) => {
  const [showTitle, setShowTitle] = useState(false);
  const [scaleImage, setScaleImage] = useState(false);

  const scaleImageHandler = () => {
    setScaleImage(true);
    setTimeout(() => {
      setScaleImage(false);
    }, 1000);
  };

  const openApp = () => {
    if (!props.isMinimized[props.id] && props.isClose[props.id]) {
      scaleImageHandler();
    }
    props.openApp(props.id);
    setShowTitle(false);
  };

  return (
    <div
      tabIndex="0"
      onClick={openApp}
      onMouseEnter={() => setShowTitle(true)}
      onMouseLeave={() => setShowTitle(false)}
      className={`${
        props.isClose[props.id] === false && props.isFocus[props.id]
          ? "bg-white bg-opacity-10 "
          : ""
      } w-auto p-2 outline-none relative transition hover:bg-white hover:bg-opacity-10 rounded m-1`}
      id={`sidebar-${props.id}`}
    >
      <img
        width="28px"
        height="28px"
        className="w-7"
        src={props.icon}
        alt="Ubuntu App Icon"
      />
      <img
        className={`${
          scaleImage ? "scale " : ""
        }scalable-app-icon w-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        src={props.icon}
        alt=""
      />
      {props.isClose[props.id] === false && (
        <div className="w-1 h-1 absolute left-0 top-1/2 bg-ub-orange rounded-sm"></div>
      )}
      <div
        className={`${
          showTitle ? "visible " : "invisible "
        } w-max py-0.5 px-1.5 absolute top-1.5 left-full ml-3 m-1 text-ubt-grey text-opacity-90 text-sm bg-ub-grey bg-opacity-70 border-gray-400 border border-opacity-40 rounded-md`}
      >
        {props.title}
      </div>
    </div>
  );
};

export default SideBarApp;
