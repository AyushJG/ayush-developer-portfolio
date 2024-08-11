import apps from "../../../../../apps.config";
import SideBarApp from "../../../../base/SideBarApp";

export const RenderApps = (props) => {
  return apps
    .filter((app) => props.favourite_apps[app.id] !== false)
    .map((app) => (
      <SideBarApp
        key={app.id}
        id={app.id}
        title={app.title}
        icon={app.icon}
        isClose={props.closed_windows}
        isFocus={props.focused_windows}
        openApp={props.openAppByAppId}
        isMinimized={props.isMinimized}
        openFromMinimised={props.openFromMinimised}
      />
    ));
};
