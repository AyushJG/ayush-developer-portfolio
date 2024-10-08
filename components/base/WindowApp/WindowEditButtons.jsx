export const WindowEditButtons = (props) => {
  return (
    <div className="absolute select-none right-0 top-0 mt-1 mr-1 flex justify-center items-center">
      <span
        className="mx-1.5 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full flex justify-center mt-1 h-5 w-5 items-center"
        onClick={props.minimize}
      >
        <img
          src="./themes/Yaru/window/window-minimize-symbolic.svg"
          alt="ubuntu window minimize"
          className="h-5 w-5 inline"
        />
      </span>
      {props.isMaximised ? (
        <span
          className="mx-2 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full flex justify-center mt-1 h-5 w-5 items-center"
          onClick={props.maximize}
        >
          <img
            src="./themes/Yaru/window/window-restore-symbolic.svg"
            alt="ubuntu window restore"
            className="h-5 w-5 inline"
          />
        </span>
      ) : (
        <span
          className="mx-2 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full flex justify-center mt-1 h-5 w-5 items-center"
          onClick={props.maximize}
        >
          <img
            src="./themes/Yaru/window/window-maximize-symbolic.svg"
            alt="ubuntu window maximize"
            className="h-5 w-5 inline"
          />
        </span>
      )}
      <button
        tabIndex="-1"
        id={`close-${props.id}`}
        className="mx-1.5 focus:outline-none cursor-default bg-ub-orange bg-opacity-90 hover:bg-opacity-100 rounded-full flex justify-center mt-1 h-5 w-5 items-center"
        onClick={props.close}
      >
        <img
          src="./themes/Yaru/window/window-close-symbolic.svg"
          alt="ubuntu window close"
          className="h-5 w-5 inline"
        />
      </button>
    </div>
  );
};
