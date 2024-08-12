import React, { useCallback, useState, useEffect } from "react";
import AboutSectionDetails from "./AboutMe";
import { navItems } from "./config";
import Education from "./Education";
import Skills from "./Skills";
import Projects from "./Projects";
import Resume from "./Resume";
import Experience from "./Experience";
import Confidentials from "./Confidentials";

export const AboutAyush = () => {
  const [screen, setScreen] = useState(<AboutSectionDetails />);
  const [activeScreen, setActiveScreen] = useState("about");
  const [navbar, setNavbar] = useState(false);

  const screens = {
    about: <AboutSectionDetails />,
    education: <Education />,
    experience: <Experience />,
    skills: <Skills />,
    projects: <Projects />,
    confidentials: <Confidentials />,
    resume: <Resume />,
  };

  const changeScreen = useCallback(
    (e) => {
      const screenId = e.id || e.target.id;

      setScreen(screens[screenId]);
      setActiveScreen(screenId);
    },
    [screens]
  );

  const showNavBar = () => {
    setNavbar((prevNavbar) => !prevNavbar);
  };

  const renderNavLinks = () => {
    return (
      <>
        {navItems.map(({ id, label, iconSrc }) => (
          <div
            key={id}
            id={id}
            tabIndex="0"
            onFocus={changeScreen}
            className={`${
              activeScreen === id
                ? "bg-ub-orange bg-opacity-100 hover:bg-opacity-95"
                : "hover:bg-gray-50 hover:bg-opacity-5"
            } w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5`}
          >
            <img
              className="w-3 md:w-4 "
              alt={`${label.toLowerCase()} icon`}
              src={iconSrc}
            />
            <span className="ml-1 md:ml-2 text-gray-50">{label}</span>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
      <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
        {renderNavLinks()}
      </div>
      <div
        onClick={showNavBar}
        className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1"
      >
        <div className="w-3.5 border-t border-white"></div>
        <div
          className="w-3.5 border-t border-white"
          style={{ marginTop: "2pt", marginBottom: "2pt" }}
        ></div>
        <div className="w-3.5 border-t border-white"></div>
        <div
          className={`${
            navbar ? "visible animateShow z-30" : "invisible"
          } md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20`}
        >
          {renderNavLinks()}
        </div>
      </div>
      <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
        {screen}
      </div>
    </div>
  );
};
