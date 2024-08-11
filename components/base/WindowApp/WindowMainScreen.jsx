import React, { useEffect, useState } from "react";
import { displayTerminal } from "../../apps/terminal";

export const WindowMainScreen = ({ addFolder, openApp, screen }) => {
  const [setDarkBg, setSetDarkBg] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSetDarkBg(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={
        "w-full flex-grow z-20 max-h-full overflow-y-auto windowMainScreen" +
        (setDarkBg ? " bg-ub-drk-abrgn " : " bg-ub-cool-grey")
      }
    >
      {addFolder ? displayTerminal(addFolder, openApp) : screen()}
    </div>
  );
};
