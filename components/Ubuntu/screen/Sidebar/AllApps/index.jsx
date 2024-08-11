import React, { useState } from "react";

const AllApps = (props) => {
  const [title, setTitle] = useState(false);

  return (
    <div
      className="w-10 h-10 rounded m-1 hover:bg-white hover:bg-opacity-10 flex items-center justify-center"
      style={{ marginTop: "auto" }}
      onMouseEnter={() => setTitle(true)}
      onMouseLeave={() => setTitle(false)}
      onClick={props.showApps}
    >
      <div className="relative">
        <img
          width="28px"
          height="28px"
          className="w-7"
          src="./themes/Yaru/system/view-app-grid-symbolic.svg"
          alt="Ubuntu view app"
        />
        {title && (
          <div className="w-max py-0.5 px-1.5 absolute top-1 left-full ml-5 text-ubt-grey text-opacity-90 text-sm bg-ub-grey bg-opacity-70 border-gray-400 border border-opacity-40 rounded-md">
            Application that I mostly use
          </div>
        )}
      </div>
    </div>
  );
};

export default AllApps;
