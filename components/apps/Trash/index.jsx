import React, { useState, useEffect } from "react";

export function Trash() {
  const trashItems = [
    {
      name: "Samsung Note 7",
      icon: "./themes/Yaru/system/folder.png",
    },
    {
      name: "Real Madrid",
      icon: "./themes/Yaru/system/folder.png",
    },
    {
      name: "Nepal Politics",
      icon: "./themes/Yaru/system/folder.png",
    },
  ];

  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    // Get user preference from local-storage
    const wasEmpty = localStorage.getItem("trash-empty");
    if (wasEmpty !== null && wasEmpty === "true") {
      setEmpty(true);
    }
  }, []);

  const focusFile = (e) => {
    const icon = e.target.querySelector("img");
    const fileName = e.target.querySelector("span");

    if (icon) {
      icon.classList.toggle("opacity-60");
    }
    if (fileName) {
      fileName.classList.toggle("bg-ub-orange");
    }
  };

  const emptyTrash = () => {
    setEmpty(true);
    localStorage.setItem("trash-empty", "true");
  };

  const emptyScreen = () => (
    <div className="flex-grow flex flex-col justify-center items-center">
      <img
        className="w-24"
        src="./themes/Yaru/status/user-trash-symbolic.svg"
        alt="Ubuntu Trash"
      />
      <span className="font-bold mt-4 text-xl px-1 text-gray-400">
        Trash is Empty
      </span>
    </div>
  );

  const showTrashItems = () => (
    <div className="flex-grow ml-4 flex flex-wrap items-start content-start justify-start overflow-y-auto windowMainScreen">
      {trashItems.map((item, index) => (
        <div
          key={index}
          tabIndex="1"
          onFocus={focusFile}
          onBlur={focusFile}
          className="flex flex-col items-center text-sm outline-none w-16 my-2 mx-4"
        >
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={item.icon} alt="Ubuntu File Icons" />
          </div>
          <span className="text-center rounded px-0.5">{item.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col bg-ub-cool-grey text-white select-none">
      <div className="flex items-center justify-between w-full bg-ub-warm-grey bg-opacity-40 text-sm">
        <span className="font-bold ml-2">Trash</span>
        <div className="flex">
          <div className="border border-black bg-black bg-opacity-50 px-3 py-1 my-1 mx-1 rounded text-gray-300">
            Restore
          </div>
          <div
            onClick={emptyTrash}
            className="border border-black bg-black bg-opacity-50 px-3 py-1 my-1 mx-1 rounded hover:bg-opacity-80"
          >
            Empty
          </div>
        </div>
      </div>
      {empty ? emptyScreen() : showTrashItems()}
    </div>
  );
}

export default Trash;

export const displayTrash = () => {
  return <Trash />;
};
