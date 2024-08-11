import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import Settings from "../../apps/Settings";

import { WindowTopBar } from "./WindowTopBar";
import { WindowYBorder } from "./WindowYBorder";
import { WindowXBorder } from "./WindowXBorder";
import { WindowEditButtons } from "./WindowEditButtons";
import { WindowMainScreen } from "./WindowMainScreen";

const Window = (props) => {
  const [cursorType, setCursorType] = useState("cursor-default");
  const [dimensions, setDimensions] = useState({ width: 60, height: 85 });
  const [closed, setClosed] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [parentSize, setParentSize] = useState({ height: 100, width: 100 });

  const id = useRef(null);
  const startX = 60;
  const startY = 10;

  useEffect(() => {
    id.current = props.id;
    setDefaultWindowDimensions();

    const handleResize = () => resizeBoundaries();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const setDefaultWindowDimensions = () => {
    if (window.innerWidth < 640) {
      setDimensions({ height: 60, width: 85 });
    } else {
      setDimensions({ height: 85, width: 60 });
    }
    resizeBoundaries();
  };

  const resizeBoundaries = () => {
    setParentSize({
      height:
        window.innerHeight -
        window.innerHeight * (dimensions.height / 100.0) -
        28,
      width: window.innerWidth - window.innerWidth * (dimensions.width / 100.0),
    });
  };

  const changeCursorToMove = () => {
    focusWindow();
    if (maximized) {
      restoreWindow();
    }
    setCursorType("cursor-move");
  };

  const changeCursorToDefault = () => {
    setCursorType("cursor-default");
  };

  const handleVerticleResize = () => {
    setDimensions((prev) => ({ ...prev, height: prev.height + 0.1 }));
    resizeBoundaries();
  };

  const handleHorizontalResize = () => {
    setDimensions((prev) => ({ ...prev, width: prev.width + 0.1 }));
    resizeBoundaries();
  };

  const setWindowsPosition = () => {
    var r = document.querySelector("#" + id.current);
    var rect = r.getBoundingClientRect();
    r.style.setProperty("--window-transform-x", rect.x.toFixed(1) + "px");
    r.style.setProperty("--window-transform-y", rect.y.toFixed(1) - 32 + "px");
  };

  const checkOverlap = () => {
    var r = document.querySelector("#" + id.current);
    var rect = r.getBoundingClientRect();
    if (rect.x.toFixed(1) < 50) {
      props.hideSideBar(id.current, true);
    } else {
      props.hideSideBar(id.current, false);
    }
  };

  const focusWindow = () => {
    props.focus(id.current);
  };

  const minimizeWindow = () => {
    let posx = -310;
    if (maximized) {
      posx = -510;
    }
    setWindowsPosition();
    var r = document.querySelector("#sidebar-" + id.current);
    var sidebBarApp = r.getBoundingClientRect();

    r = document.querySelector("#" + id.current);
    r.style.transform = `translate(${posx}px,${
      sidebBarApp.y.toFixed(1) - 240
    }px) scale(0.2)`;
    props.hasMinimised(id.current);
  };

  const restoreWindow = () => {
    var r = document.querySelector("#" + id.current);
    setDefaultWindowDimensions();
    let posx = r.style.getPropertyValue("--window-transform-x");
    let posy = r.style.getPropertyValue("--window-transform-y");

    r.style.transform = `translate(${posx},${posy})`;
    setTimeout(() => {
      setMaximized(false);
      checkOverlap();
    }, 300);
  };

  const maximizeWindow = () => {
    if (maximized) {
      restoreWindow();
    } else {
      focusWindow();
      var r = document.querySelector("#" + id.current);
      setWindowsPosition();
      r.style.transform = `translate(-1pt,-2pt)`;
      setMaximized(true);
      setDimensions({ height: 96.3, width: 100.2 });
      props.hideSideBar(id.current, true);
    }
  };

  const closeWindow = () => {
    setWindowsPosition();
    setClosed(true);
    props.hideSideBar(id.current, false);
    setTimeout(() => {
      props.closed(id.current);
    }, 300);
  };

  return (
    <Draggable
      axis="both"
      handle=".bg-ub-window-title"
      grid={[1, 1]}
      scale={1}
      onStart={changeCursorToMove}
      onStop={changeCursorToDefault}
      onDrag={checkOverlap}
      allowAnyClick={false}
      defaultPosition={{ x: startX, y: startY }}
      bounds={{
        left: 0,
        top: 0,
        right: parentSize.width,
        bottom: parentSize.height,
      }}
    >
      <div
        style={{
          width: `${dimensions.width}%`,
          height: `${dimensions.height}%`,
        }}
        className={`${cursorType} ${closed ? " closed-window " : ""} ${
          maximized
            ? " duration-300 rounded-none"
            : " rounded-lg rounded-b-none"
        } ${props.minimized ? " opacity-0 invisible duration-200 " : ""} ${
          props.isFocused ? " z-30 " : " z-20 notFocused"
        } opened-window overflow-hidden min-w-1/4 min-h-1/4 main-window absolute window-shadow border-black border-opacity-40 border border-t-0 flex flex-col`}
        id={id.current}
      >
        <WindowYBorder resize={handleHorizontalResize} />
        <WindowXBorder resize={handleVerticleResize} />
        <WindowTopBar title={props.title} />
        <WindowEditButtons
          minimize={minimizeWindow}
          maximize={maximizeWindow}
          isMaximised={maximized}
          close={closeWindow}
          id={id.current}
        />
        {id.current === "settings" ? (
          <Settings
            changeBackgroundImage={props.changeBackgroundImage}
            currBgImgName={props.bg_image_name}
          />
        ) : (
          <WindowMainScreen
            screen={props.screen}
            title={props.title}
            addFolder={props.id === "terminal" ? props.addFolder : null}
            openApp={props.openApp}
          />
        )}
      </div>
    </Draggable>
  );
};

export default Window;
