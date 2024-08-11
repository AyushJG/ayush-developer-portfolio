import React, { useState, useEffect } from "react";
import BootingScreen from "./screen/BootingScreen";
import Desktop from "./screen/Desktop";
import LockScreen from "./screen/LockScreen";
import Navbar from "./screen/Navbar";

const Ubuntu = () => {
  const [screenLocked, setScreenLocked] = useState(false);
  const [bgImageName, setBgImageName] = useState("wall-2");
  const [bootingScreen, setBootingScreen] = useState(true);
  const [shutDownScreen, setShutDownScreen] = useState(false);

  useEffect(() => {
    getLocalData();
  }, []);

  const setTimeOutBootScreen = () => {
    setTimeout(() => {
      setBootingScreen(false);
    }, 2000);
  };

  const getLocalData = () => {
    let bgImageName = localStorage.getItem("bg-image");
    if (bgImageName !== null && bgImageName !== undefined) {
      setBgImageName(bgImageName);
    }

    let bootingScreen = localStorage.getItem("booting_screen");
    if (bootingScreen !== null && bootingScreen !== undefined) {
      setBootingScreen(false);
    } else {
      localStorage.setItem("booting_screen", false);
      setTimeOutBootScreen();
    }

    let shutDown = localStorage.getItem("shut-down");
    if (shutDown !== null && shutDown !== undefined && shutDown === "true")
      shutDown();
    else {
      let screenLocked = localStorage.getItem("screen-locked");
      if (screenLocked !== null && screenLocked !== undefined) {
        setScreenLocked(screenLocked === "true");
      }
    }
  };

  const lockScreen = () => {
    document.getElementById("status-bar").blur();
    setTimeout(() => {
      setScreenLocked(true);
    }, 100);
    localStorage.setItem("screen-locked", true);
  };

  const unLockScreen = () => {
    window.removeEventListener("click", unLockScreen);
    window.removeEventListener("keypress", unLockScreen);

    setScreenLocked(false);
    localStorage.setItem("screen-locked", false);
  };

  const changeBackgroundImage = (imgName) => {
    setBgImageName(imgName);
    localStorage.setItem("bg-image", imgName);
  };

  const shutDown = () => {
    document.getElementById("status-bar").blur();
    setShutDownScreen(true);
    localStorage.setItem("shut-down", true);
  };

  const turnOn = () => {
    setShutDownScreen(false);
    setBootingScreen(true);
    setTimeOutBootScreen();
    localStorage.setItem("shut-down", false);
  };

  return (
    <div className="w-screen h-screen overflow-hidden" id="monitor-screen">
      <LockScreen
        isLocked={screenLocked}
        bgImgName={bgImageName}
        unLockScreen={unLockScreen}
      />
      <BootingScreen
        visible={bootingScreen}
        isShutDown={shutDownScreen}
        turnOn={turnOn}
      />
      <Navbar lockScreen={lockScreen} shutDown={shutDown} />
      <Desktop
        bg_image_name={bgImageName}
        changeBackgroundImage={changeBackgroundImage}
      />
    </div>
  );
};

export default Ubuntu;
