import React, { useState, useEffect } from "react";

const Chrome = () => {
  const home_url = "https://www.google.com/webhp?igu=1";
  const [url, setUrl] = useState(home_url);
  const [displayUrl, setDisplayUrl] = useState("https://www.google.com");

  useEffect(() => {
    const lastVisitedUrl = localStorage.getItem("chrome-url");
    const lastDisplayedUrl = localStorage.getItem("chrome-display-url");
    if (lastVisitedUrl) {
      setUrl(lastVisitedUrl);
      setDisplayUrl(lastDisplayedUrl);
    }
  }, []);

  const storeVisitedUrl = (url, displayUrl) => {
    localStorage.setItem("chrome-url", url);
    localStorage.setItem("chrome-display-url", displayUrl);
  };

  const refreshChrome = () => {
    document.getElementById("chrome-screen").src += "";
  };

  const goToHome = () => {
    setUrl(home_url);
    setDisplayUrl("https://www.google.com");
    refreshChrome();
  };

  const checkKey = (e) => {
    if (e.key === "Enter") {
      let inputUrl = e.target.value.trim();
      if (inputUrl.length === 0) return;

      if (!inputUrl.startsWith("http://") && !inputUrl.startsWith("https://")) {
        inputUrl = "https://" + inputUrl;
      }

      inputUrl = encodeURI(inputUrl);
      let newDisplayUrl = inputUrl;
      if (inputUrl.includes("google.com")) {
        inputUrl = "https://www.google.com/webhp?igu=1";
        newDisplayUrl = "https://www.google.com";
      }

      setUrl(inputUrl);
      setDisplayUrl(newDisplayUrl);
      storeVisitedUrl(inputUrl, newDisplayUrl);
      document.getElementById("chrome-url-bar").blur();
    }
  };

  const handleDisplayUrl = (e) => {
    setDisplayUrl(e.target.value);
  };

  const displayUrlBar = () => {
    return (
      <div className="w-full pt-0.5 pb-1 flex justify-start items-center text-white text-sm border-b border-gray-900">
        <div
          onClick={refreshChrome}
          className="ml-2 mr-1 flex justify-center items-center rounded-full bg-gray-50 bg-opacity-0 hover:bg-opacity-10"
        >
          <img
            className="w-5"
            src="./themes/Yaru/status/chrome_refresh.svg"
            alt="Ubuntu Chrome Refresh"
          />
        </div>
        <div
          onClick={goToHome}
          className="mr-2 ml-1 flex justify-center items-center rounded-full bg-gray-50 bg-opacity-0 hover:bg-opacity-10"
        >
          <img
            className="w-5"
            src="./themes/Yaru/status/chrome_home.svg"
            alt="Ubuntu Chrome Home"
          />
        </div>
        <input
          onKeyDown={checkKey}
          onChange={handleDisplayUrl}
          value={displayUrl}
          id="chrome-url-bar"
          className="outline-none bg-ub-grey rounded-full pl-3 py-0.5 mr-3 w-5/6 text-gray-300 focus:text-white"
          type="url"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col bg-ub-cool-grey">
      {displayUrlBar()}
      <iframe
        src={url}
        className="flex-grow"
        id="chrome-screen"
        frameBorder="0"
        title="Ubuntu Chrome Url"
      ></iframe>
    </div>
  );
};

export default Chrome;

export const displayChrome = () => {
  return <Chrome />;
};
