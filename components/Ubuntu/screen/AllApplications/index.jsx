import React, { useState, useEffect } from "react";
import UbuntuApp from "../../../base/UbuntuApp";

const AllApplications = (props) => {
  const [query, setQuery] = useState("");
  const [apps, setApps] = useState([]);
  const [category, setCategory] = useState(0);

  useEffect(() => {
    setApps(props.apps);
  }, [props.apps]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setApps(
      value === "" || value === null
        ? props.apps
        : apps.filter((app) =>
            app.title.toLowerCase().includes(value.toLowerCase())
          )
    );
  };

  const renderApps = () => {
    let appsJsx = [];
    const frequentAppsInfo = JSON.parse(localStorage.getItem("frequentApps"));

    const getFrequentApps = () => {
      let frequentApps = [];
      if (frequentAppsInfo) {
        frequentAppsInfo.forEach((app_info) => {
          let app = props.apps.find((app) => app.id === app_info.id);
          if (app) {
            frequentApps.push(app);
          }
        });
      }
      return frequentApps;
    };

    const filteredApps = category === 0 ? [...apps] : getFrequentApps();

    filteredApps.forEach((app, index) => {
      const appProps = {
        name: app.title,
        id: app.id,
        icon: app.icon,
        openApp: props.openApp,
      };

      appsJsx.push(<UbuntuApp key={index} {...appProps} />);
    });

    return appsJsx;
  };

  const handleSwitch = (newCategory) => {
    if (newCategory !== category) {
      setCategory(newCategory);
    }
  };

  return (
    <div
      className={
        "absolute h-full top-7 w-full z-20 pl-12 justify-center md:pl-20 border-black border-opacity-60 bg-black bg-opacity-70"
      }
    >
      <div className={"flex md:pr-20 pt-5 align-center justify-center"}>
        <div
          className={
            "flex w-2/3 h-full items-center pl-2 pr-2 bg-white border-black border-width-2 rounded-xl overflow-hidden md:w-1/3 "
          }
        >
          <img
            className={"w-5 h-5"}
            alt="search icon"
            src={"./images/logos/search.png"}
          />
          <input
            className={"w-3/4 p-1 bg-transparent focus:outline-none"}
            placeholder="Type to Search "
            value={query}
            onChange={handleChange}
          />
        </div>
      </div>
      <div
        className={
          "grid md:grid-cols-6 md:grid-rows-3 grid-cols-3 grid-rows-6 md:gap-4 gap-1 md:px-20 px-5 pt-10 justify-center"
        }
      >
        {renderApps()}
      </div>
      <div
        className={
          "flex align-center justify-center w-full fixed bottom-0 mb-15 pr-20  md:pr-20 "
        }
      >
        <div
          className={
            "w-1/4 text-center group text-white bg-transparent cursor-pointer items-center"
          }
          onClick={() => handleSwitch(1)}
        >
          <h4>Frequent</h4>
          {category === 1 ? (
            <div className={"h-1 mt-1 bg-ub-orange self-center"} />
          ) : (
            <div className={"h-1 mt-1 bg-transparent group-hover:bg-white "} />
          )}
        </div>
        <div
          className={
            "w-1/4 text-center group text-white bg-transparent cursor-pointer items-center"
          }
          onClick={() => handleSwitch(0)}
        >
          <h4>All</h4>
          {category === 0 ? (
            <div className={"h-1 mt-1 bg-ub-orange self-center"} />
          ) : (
            <div className={"h-1 mt-1 bg-transparent group-hover:bg-white"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllApplications;
