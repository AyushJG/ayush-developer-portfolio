import React from "react";
import { EyeIcon } from "@heroicons/react/24/outline"; // Import the eye icon from Heroicons
import { conf_project_list, tag_colors } from "./constant";

const Confidentials = () => {
  return (
    <>
      <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4 p-1">
        Organization Confidential Project
        <div className="absolute pt-px bg-white mt-px top-full w-full">
          <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
          <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {conf_project_list.map((project, index) => (
          <div
            key={index}
            className="relative group flex flex-col border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative w-full h-64 bg-gray-200 overflow-hidden p-2">
              <img
                src={project?.image}
                alt={project.name}
                className="w-full h-full object-contain"
              />
              <a
                href={project.go}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg"
              >
                <EyeIcon className="w-12 h-12 text-white cursor-pointer" />
              </a>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
              <ul className="text-sm font-light mb-2">
                {project.summary.map((desc, index) => (
                  <li key={index} className="mb-1">
                    {desc}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 text-xs">
                {project.domains &&
                  project.domains.map((domain, index) => {
                    const borderColorClass = `border-${tag_colors[domain]}`;
                    const textColorClass = `text-${tag_colors[domain]}`;

                    return (
                      <span
                        key={index}
                        className={`px-2 py-1 border ${borderColorClass} ${textColorClass} rounded-full`}
                      >
                        {domain}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Confidentials;
