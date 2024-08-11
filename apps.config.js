import { displayTerminal } from "./components/apps/terminal";
import { displaySettings } from "./components/apps/Settings";
import { displayChrome } from "./components/apps/Chrome";
import { displayTrash } from "./components/apps/Trash";
import { displayContact } from "./components/apps/Contact";
import { displayAboutAyush } from "./components/apps/Ayush";

const apps = [
  {
    id: "chrome",
    title: "Google Chrome",
    icon: "./themes/Yaru/apps/chrome.png",
    disabled: false,
    favourite: true,
    desktop_shortcut: true,
    screen: displayChrome,
  },

  {
    id: "about-ayush",
    title: "About Ayush",
    icon: "./themes/Yaru/system/user-home.png",
    disabled: false,
    favourite: true,
    desktop_shortcut: true,
    screen: displayAboutAyush,
  },

  {
    id: "terminal",
    title: "Terminal",
    icon: "./themes/Yaru/apps/bash.png",
    disabled: false,
    favourite: true,
    desktop_shortcut: false,
    screen: displayTerminal,
  },

  {
    id: "settings",
    title: "Settings",
    icon: "./themes/Yaru/apps/gnome-control-center.png",
    disabled: false,
    favourite: true,
    desktop_shortcut: false,
    screen: displaySettings,
  },
  {
    id: "trash",
    title: "Trash",
    icon: "./themes/Yaru/system/user-trash-full.png",
    disabled: false,
    favourite: false,
    desktop_shortcut: true,
    screen: displayTrash,
  },
  {
    id: "gedit",
    title: "Contact Me",
    icon: "./themes/Yaru/apps/gedit.png",
    disabled: false,
    favourite: false,
    desktop_shortcut: true,
    screen: displayContact,
  },
];

export default apps;
