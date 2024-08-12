import React, { useState, useEffect, useCallback } from "react";
import BackgroundImage from "../../../utils/background-image";
import SideBar from "../Sidebar";
import apps from "../../../../apps.config";
import Window from "../../../base/WindowApp";
import UbuntuApp from "../../../base/UbuntuApp";
import AllApplications from "../AllApplications";
import DesktopMenu from "../../../context menus/DesktopMenu";
import DefaultMenu from "../../../context menus/DefaultMenu";
import $ from "jquery";
import { RenderNameBar } from "./RenderNameBar";

const Desktop = ({ bg_image_name, changeBackgroundImage }) => {
  const [focusedWindows, setFocusedWindows] = useState({});
  const [closedWindows, setClosedWindows] = useState({});
  const [allAppsView, setAllAppsView] = useState(false);
  const [overlappedWindows, setOverlappedWindows] = useState({});
  const [disabledApps, setDisabledApps] = useState({});
  const [favouriteApps, setFavouriteApps] = useState({});
  const [hideSideBar, setHideSideBar] = useState(false);
  const [minimizedWindows, setMinimizedWindows] = useState({});
  const [desktopApps, setDesktopApps] = useState([]);

  const [contextMenus, setContextMenus] = useState({
    desktop: false,
    default: false,
  });
  const [showNameBar, setShowNameBar] = useState(false);

  let appStack = [];
  let initFavourite = {};

  useEffect(() => {
    fetchAppsData();
    setContextListeners();
    setEventListeners();
    checkForNewFolders();

    return () => {
      removeContextListeners();
    };
  }, []);

  const checkForNewFolders = useCallback(() => {
    let new_folders = localStorage.getItem("new_folders");

    if (new_folders === null || new_folders === undefined) {
      localStorage.setItem("new_folders", JSON.stringify([]));
    } else {
      new_folders = JSON.parse(new_folders);
      const updatedApps = [...desktopApps];

      new_folders.forEach((folder) => {
        updatedApps.push({
          id: `new-folder-${folder.id}`,
          title: folder.name,
          icon: "./themes/Yaru/system/folder.png",
          disabled: true,
          favourite: false,
          desktop_shortcut: true,
          screen: () => {},
        });
      });

      setDesktopApps(updatedApps);
      updateAppsData();
    }
  }, []);
  const openApp = useCallback(
    (objId) => {
      if (disabledApps[objId]) return;

      if (minimizedWindows[objId]) {
        focus(objId);

        const r = document.querySelector(`#${objId}`);
        if (r) {
          r.style.transform = `translate(${r.style.getPropertyValue(
            "--window-transform-x"
          )}, ${r.style.getPropertyValue("--window-transform-y")}) scale(1)`;
        }

        setMinimizedWindows((prev) => ({ ...prev, [objId]: false }));
        return;
      }

      if (appStack?.current?.includes(objId)) {
        focus(objId);
      } else {
        const frequentApps =
          JSON.parse(localStorage.getItem("frequentApps")) || [];
        const currentApp = frequentApps.find((app) => app.id === objId);

        if (currentApp) {
          frequentApps.forEach((app) => {
            if (app.id === currentApp.id) {
              app.frequency += 1;
            }
          });
        } else {
          frequentApps.push({ id: objId, frequency: 1 });
        }

        frequentApps.sort((a, b) => b.frequency - a.frequency);
        localStorage.setItem("frequentApps", JSON.stringify(frequentApps));

        setTimeout(() => {
          setFavouriteApps((prev) => ({ ...prev, [objId]: true }));
          setClosedWindows((prev) => ({ ...prev, [objId]: false }));
          setAllAppsView(false);
          focus(objId);
          appStack?.current?.push(objId);
        }, 200);
      }
    },
    [disabledApps, minimizedWindows]
  );
  const setEventListeners = useCallback(() => {
    const settingsButton = document.getElementById("open-settings");
    if (settingsButton) {
      settingsButton.addEventListener("click", () => {
        openApp("settings");
      });
    }
  }, [openApp]);

  const showContextMenu = (e, menuName) => {
    let { posx, posy } = getMenuPosition(e);
    let contextMenu = document.getElementById(`${menuName}-menu`);

    if (posx + $(contextMenu).width() > window.innerWidth)
      posx -= $(contextMenu).width();
    if (posy + $(contextMenu).height() > window.innerHeight)
      posy -= $(contextMenu).height();

    posx = posx.toString() + "px";
    posy = posy.toString() + "px";

    contextMenu.style.left = posx;
    contextMenu.style.top = posy;

    setContextMenus((prevMenus) => ({ ...prevMenus, [menuName]: true }));
  };

  const checkContextMenu = (e) => {
    e.preventDefault();
    hideAllContextMenu();

    switch (e.target.dataset.context) {
      case "desktop-area":
        showContextMenu(e, "desktop");
        break;
      default:
        showContextMenu(e, "default");
    }
  };

  const hideAllContextMenu = () => {
    setContextMenus((prevMenus) => {
      let updatedMenus = { ...prevMenus };
      Object.keys(updatedMenus).forEach((key) => {
        updatedMenus[key] = false;
      });
      return updatedMenus;
    });
  };

  const setContextListeners = useCallback(() => {
    document.addEventListener("contextmenu", checkContextMenu);
    document.addEventListener("click", hideAllContextMenu);
  }, [checkContextMenu, hideAllContextMenu]);

  const removeContextListeners = useCallback(() => {
    document.removeEventListener("contextmenu", checkContextMenu);
    document.removeEventListener("click", hideAllContextMenu);
  }, [checkContextMenu, hideAllContextMenu]);

  const getMenuPosition = (e) => {
    let posx = 0;
    let posy = 0;

    if (!e) e = window.event;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + window.pageXOffset;
      posy = e.clientY + window.pageYOffset;
    }

    return { posx, posy };
  };

  const fetchAppsData = () => {
    const focusedWindows = {};
    const closedWindows = {};
    const disabledApps = {};
    const favouriteApps = {};
    const overlappedWindows = {};
    const minimizedWindows = {};
    const desktopApps = [];

    apps.forEach((app) => {
      focusedWindows[app.id] = false;
      closedWindows[app.id] = true;
      disabledApps[app.id] = app.disabled;
      favouriteApps[app.id] = app.favourite;
      overlappedWindows[app.id] = false;
      minimizedWindows[app.id] = false;

      if (app.desktop_shortcut) {
        desktopApps.push(app.id);
      }
    });

    setFocusedWindows(focusedWindows);
    setClosedWindows(closedWindows);
    setDisabledApps(disabledApps);
    setFavouriteApps(favouriteApps);
    setOverlappedWindows(overlappedWindows);
    setMinimizedWindows(minimizedWindows);
    setDesktopApps(desktopApps);

    initFavourite = { ...favouriteApps };
  };

  const updateAppsData = useCallback(() => {
    let newFocusedWindows = {};
    let newClosedWindows = {};
    let newFavouriteApps = {};
    let newMinimizedWindows = {};
    let newDisabledApps = {};
    let newDesktopApps = [];

    apps.forEach((app) => {
      newFocusedWindows[app.id] =
        focusedWindows[app.id] !== undefined || focusedWindows[app.id] !== null
          ? focusedWindows[app.id]
          : false;

      newMinimizedWindows[app.id] =
        minimizedWindows[app.id] !== undefined ||
        minimizedWindows[app.id] !== null
          ? minimizedWindows[app.id]
          : false;

      newDisabledApps[app.id] = app.disabled;

      newClosedWindows[app.id] =
        closedWindows[app.id] !== undefined || closedWindows[app.id] !== null
          ? closedWindows[app.id]
          : true;

      newFavouriteApps[app.id] = app.favourite;

      if (app.desktop_shortcut) newDesktopApps.push(app.id);
    });

    setFocusedWindows(newFocusedWindows);
    setClosedWindows(newClosedWindows);
    setDisabledApps(newDisabledApps);
    setMinimizedWindows(newMinimizedWindows);
    setFavouriteApps(newFavouriteApps);
    setDesktopApps(newDesktopApps);

    // Update initFavourite
    initFavourite = { ...newFavouriteApps };
  }, [focusedWindows, closedWindows, minimizedWindows, disabledApps]);

  const renderDesktopApps = () => {
    if (Object.keys(closedWindows).length === 0) return null;

    return apps
      .filter((app) => desktopApps.includes(app.id))
      .map((app, index) => {
        const { title, id, icon } = app;
        const props = {
          name: title,
          id,
          icon,
          openApp,
        };

        return <UbuntuApp key={id} {...props} />;
      });
  };

  const renderWindows = () => {
    return apps
      .filter((app) => closedWindows[app.id] === false)
      .map((app) => {
        const { title, id, screen } = app;
        const props = {
          title,
          id,
          screen,
          addFolder: addToDesktop,
          closed: closeApp,
          openApp,
          focus,
          isFocused: focusedWindows[id],
          hideSideBar: hideSideBarAction,
          hasMinimised,
          minimized: minimizedWindows[id],
          changeBackgroundImage,
          bg_image_name,
        };

        return <Window key={id} {...props} />;
      });
  };

  const hideSideBarAction = (objId, hide) => {
    if (hide === hideSideBar) return;

    if (objId === null) {
      if (hide === false) {
        setHideSideBar(false);
      } else {
        const anyOverlapped = Object.values(overlappedWindows).some(Boolean);
        if (anyOverlapped) {
          setHideSideBar(true);
        }
      }
      return;
    }

    if (hide === false) {
      const shouldShowSidebar = !Object.keys(overlappedWindows).some(
        (key) => overlappedWindows[key] && key !== objId
      );
      if (!shouldShowSidebar) return;
    }

    setOverlappedWindows((prev) => {
      const updatedOverlappedWindows = { ...prev, [objId]: hide };
      setHideSideBar(hide);
      return updatedOverlappedWindows;
    });
  };

  const hasMinimised = (objId) => {
    setMinimizedWindows((prev) => {
      const updatedMinimizedWindows = { ...prev, [objId]: true };

      setFocusedWindows((prev) => {
        const updatedFocusedWindows = { ...prev, [objId]: false };
        return updatedFocusedWindows;
      });

      hideSideBarAction(null, false);

      giveFocusToLastApp();

      return updatedMinimizedWindows;
    });
  };

  const giveFocusToLastApp = () => {
    if (!checkAllMinimized()) {
      for (const appId of appStack) {
        if (!minimizedWindows[appId]) {
          focus(appId);
          break;
        }
      }
    }
  };

  const checkAllMinimized = () => {
    return Object.keys(minimizedWindows).every((key) =>
      closedWindows[key] ? minimizedWindows[key] : true
    );
  };

  const closeApp = (objId) => {
    appStack = appStack.filter((id) => id !== objId);
    giveFocusToLastApp();
    hideSideBarAction(null, false);
    setClosedWindows((prev) => {
      const updatedClosedWindows = { ...prev, [objId]: true };
      setFavouriteApps((prev) => {
        const updatedFavouriteApps = { ...prev };
        if (initFavourite[objId] === false) updatedFavouriteApps[objId] = false;
        return updatedFavouriteApps;
      });
      return updatedClosedWindows;
    });
  };

  const focus = (objId) => {
    setFocusedWindows((prevFocusedWindows) => {
      const updatedFocusedWindows = { ...prevFocusedWindows };
      for (const key in updatedFocusedWindows) {
        if (updatedFocusedWindows.hasOwnProperty(key)) {
          updatedFocusedWindows[key] = key === objId;
        }
      }

      return updatedFocusedWindows;
    });
  };

  const addNewFolder = () => {
    setShowNameBar(true);
  };
  const addToDesktop = (folderName) => {
    folderName = folderName.trim();
    const folderId = folderName.replace(/\s+/g, "-").toLowerCase();

    const newFolder = {
      id: `new-folder-${folderId}`,
      title: folderName,
      icon: "./themes/Yaru/system/folder.png",
      disabled: true,
      favourite: false,
      desktop_shortcut: true,
      screen: () => {},
    };
    apps.push(newFolder);
    const newFolders = JSON.parse(localStorage.getItem("new_folders")) || [];
    newFolders.push({ id: `new-folder-${folderId}`, name: folderName });
    localStorage.setItem("new_folders", JSON.stringify(newFolders));
    setShowNameBar(false);
    updateAppsData();
  };

  const showAllApps = () => {
    setAllAppsView((prevState) => !prevState);
  };

  return (
    <div
      className={
        " h-full w-full flex flex-col items-end justify-start content-start flex-wrap-reverse pt-8 bg-transparent relative overflow-hidden overscroll-none window-parent"
      }
    >
      <div
        className="absolute h-full w-full bg-transparent"
        data-context="desktop-area"
      >
        {renderWindows()}
      </div>

      <BackgroundImage img={bg_image_name} />

      <SideBar
        apps={apps}
        hide={hideSideBar}
        hideSideBar={hideSideBarAction}
        favourite_apps={favouriteApps}
        showAllApps={showAllApps}
        allAppsView={allAppsView}
        closed_windows={closedWindows}
        focused_windows={focusedWindows}
        isMinimized={minimizedWindows}
        openAppByAppId={openApp}
      />

      {renderDesktopApps()}

      <DesktopMenu
        active={contextMenus.desktop}
        openApp={openApp}
        addNewFolder={addNewFolder}
      />
      <DefaultMenu active={contextMenus.default} />

      {showNameBar ? (
        <RenderNameBar
          addToDesktop={addToDesktop}
          setShowNameBar={setShowNameBar}
        />
      ) : null}

      {allAppsView ? (
        <AllApplications apps={apps} recentApps={appStack} openApp={openApp} />
      ) : null}
    </div>
  );
};

export default Desktop;
