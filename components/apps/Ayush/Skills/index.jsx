import React from "react";
import { frameworksAndLibraries, languagesAndTools } from "./constant";

const Skills = () => {
  return (
    <>
      <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
        Technical Skills
        <div className="absolute pt-px bg-white mt-px top-full w-full">
          <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
          <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
        </div>
      </div>
      <ul className="tracking-tight text-sm md:text-base w-10/12 emoji-list">
        <li className="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
          I've worked with a wide variety of programming languages & frameworks.
        </li>
        <li className="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
          <div>
            My areas of expertise are{" "}
            <strong className="text-ubt-gedit-orange">
              front-end development, React.js & JavaScript!
            </strong>
          </div>
        </li>
        <li className="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
          <div>Here are my most frequently used tools:</div>
        </li>
      </ul>
      <div className="w-full md:w-10/12 flex mt-4">
        <div className="text-sm text-center md:text-base w-1/2 font-bold">
          Languages & Tools
        </div>
        <div className="text-sm text-center md:text-base w-1/2 font-bold">
          Frameworks & Libraries
        </div>
      </div>
      <div className="w-full md:w-10/12 flex justify-center items-start font-bold text-center">
        <div className="px-2 w-1/2">
          <div className="flex flex-wrap justify-center items-start w-full mt-2">
            {languagesAndTools.map((tool, index) => (
              <a
                key={index}
                href={tool.href ? tool.href : "#"}
                target={tool.href ? "_blank" : ""}
                rel={tool.href ? "noreferrer" : ""}
              >
                <img
                  className="m-1"
                  src={tool.src}
                  alt={tool.alt}
                  title={tool.title ? tool.title : ""}
                />
              </a>
            ))}
          </div>
        </div>
        <div className="px-2 flex flex-wrap items-start w-1/2">
          <div className="flex flex-wrap justify-center items-start w-full mt-2">
            {frameworksAndLibraries.map((framework, index) => (
              <img
                key={index}
                className="m-1"
                src={framework.src}
                alt={framework.alt}
              />
            ))}
          </div>
        </div>
      </div>
      <ul className="tracking-tight text-sm md:text-base w-10/12 emoji-list mt-4">
        <li className="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
          <span>And of course,</span>{" "}
          <img
            className="inline ml-1"
            src="http://img.shields.io/badge/-Linux-0078D6?style=plastic&logo=linux&logoColor=ffffff"
            alt="Linux"
          />{" "}
          <span>!</span>
        </li>
      </ul>
    </>
  );
};

export default Skills;
