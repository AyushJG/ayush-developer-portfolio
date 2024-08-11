import React from "react";
import { experience } from "./constant";

const Experience = () => {
  return (
    <>
      <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
        Experience
        <div className="absolute pt-px bg-white mt-px top-full w-full">
          <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
          <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
        </div>
      </div>
      <ul className="w-10/12 mt-4 ml-4 px-0 md:px-1">
        {experience.map((item) => (
          <li className="list-disc mt-4" key={item.id}>
            <div className="text-lg md:text-xl text-left font-bold leading-tight">
              <a
                href={item.companyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-600"
              >
                {item.title}
              </a>
            </div>
            <div className="text-sm text-gray-400 mt-0.5">
              {item.from} - {item.to || "Present"}
            </div>
            <div className="text-sm md:text-base">{item.job}</div>
            <ul className="text-sm text-gray-300 mt-1 list-disc pl-5">
              {item.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Experience;
