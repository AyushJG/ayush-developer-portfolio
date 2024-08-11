import React from "react";
import { RenderApps } from "./RenderApps";
import AllApps from "./AllApps";

const SideBar = (props) => {
  const showSideBar = () => {
    props.hideSideBar(null, false);
  };

  const hideSideBar = () => {
    setTimeout(() => {
      props.hideSideBar(null, true);
    }, 2000);
  };

  return (
    <>
      <div
        className={`absolute transform duration-300 select-none z-40 left-0 top-0 h-full pt-7 w-auto flex flex-col justify-start items-center border-black border-opacity-60 bg-black bg-opacity-50 ${
          props.hide ? "-translate-x-full" : ""
        }`}
      >
        {Object.keys(props.closed_windows).length !== 0 && (
          <RenderApps {...props} />
        )}
        <AllApps showApps={props.showAllApps} />
      </div>
      <div
        onMouseEnter={showSideBar}
        onMouseLeave={hideSideBar}
        className="w-1 h-full absolute top-0 left-0 bg-transparent z-50"
      ></div>
    </>
  );
};

export default SideBar;
export { AllApps };
