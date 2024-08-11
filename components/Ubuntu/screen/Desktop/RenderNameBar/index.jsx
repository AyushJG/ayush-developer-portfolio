export const RenderNameBar = ({ setShowNameBar, addToDesktop }) => {
  const addFolder = () => {
    const folderName = document
      .getElementById("folder-name-input")
      .value.trim();
    addToDesktop(folderName);
  };

  const removeCard = () => {
    setShowNameBar(false);
  };

  return (
    <div className="absolute rounded-md top-1/2 left-1/2 text-center text-white font-light text-sm bg-ub-cool-grey transform -translate-y-1/2 -translate-x-1/2 sm:w-96 w-3/4 z-50">
      <div className="w-full flex flex-col justify-around items-start pl-6 pb-8 pt-6">
        <span>New folder name</span>
        <input
          className="outline-none mt-5 px-1 w-10/12 context-menu-bg border-2 border-yellow-700 rounded py-0.5"
          id="folder-name-input"
          type="text"
          autoComplete="off"
          spellCheck="false"
          autoFocus
        />
      </div>
      <div className="flex">
        <div
          onClick={addFolder}
          className="w-1/2 px-4 py-2 border border-gray-900 border-opacity-50 border-r-0 hover:bg-ub-warm-grey hover:bg-opacity-10 hover:border-opacity-50"
        >
          Create
        </div>
        <div
          onClick={removeCard}
          className="w-1/2 px-4 py-2 border border-gray-900 border-opacity-50 hover:bg-ub-warm-grey hover:bg-opacity-10 hover:border-opacity-50"
        >
          Cancel
        </div>
      </div>
    </div>
  );
};
