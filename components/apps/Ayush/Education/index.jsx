import React from "react";
import { education } from "./constant";

const Education = () => {
  return (
    <>
      <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
        Education
        <div className="absolute pt-px bg-white mt-px top-full w-full">
          <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
          <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
        </div>
      </div>
      <ul className="w-10/12 mt-4 ml-4 px-0 md:px-1">
        {education.map((item) => (
          <li className="list-disc mt-4" key={item.id}>
            <div className="text-lg md:text-xl text-left font-bold leading-tight ">
              {item.title}
            </div>
            <div className="text-sm text-gray-400 mt-0.5">
              {item.from} - {item.to || "Present"}
            </div>
            <div className="text-sm md:text-base">{item.course}</div>
            <div className="text-sm text-gray-300 font-bold mt-1">
              GPA &nbsp; {item.gpa}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Education;
