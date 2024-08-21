import React from "react";
const AboutMe = () => {
  return (
    <>
      <div className="w-48 md:w-64 my-4 bg-white rounded-full">
        <img
          className="w-full"
          src="./images/logos/me.png"
          alt="Ayush Timalsina"
        />
      </div>
      <div className="text-lg md:text-2xl px-1 mt-4 md:mt-8">
        <div className="align">
          My name is <span className="font-bold">Ayush Timalsina</span>,
        </div>
        <div className="font-normal mt-1">
          <span className="relative inline-block whitespace-nowrap overflow-hidden border-r-2 border-pink-600 animate-typewriter">
            <span className="relative inline-block text-pink-600">
              Product Engineer specializing in Frontend
            </span>
          </span>
        </div>
      </div>
      <div className=" mt-4 relative md:my-8 pt-px bg-white w-4/5 md:w-4/5">
        <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
        <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
      </div>
      <ul className=" mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list mb-4">
        <li className=" list-pc">
          I'm a <span className=" font-medium">Graduated Student</span>{" "}
          currently working as Product Engineer. I've completed more than 4 Year
          as a Product Engineer / Web Developer at{" "}
          <u className=" cursor-pointer ">
            {" "}
            <a href="https://varicon.com.au/" target={"_blank"}>
              Varicon
            </a>{" "}
          </u>
          , and now I'm looking for full-time{" "}
          <span className=" font-medium"> Product/Frontend engineer</span>{" "}
          roles! ( Hit me up at{" "}
          <a className="text-underline" href="mailto:ayushtimalcina@gmail.com">
            <u>@ayushtimalcina@gmail.com</u>
          </a>{" "}
          :)
        </li>
        <li className=" mt-3 list-building">
          {" "}
          I enjoy building awesome softwares that solve practical problems.
        </li>
        <li className=" mt-3 list-time">
          {" "}
          When I am not coding my next project, I like to spend my time singing
          playing guitar or playing video games.
        </li>
        <li className="mt-3 list-star">
          Beyond my technical pursuits, I also embrace the role of an
          entrepreneur. I also manage a part-time business in Nepal named{" "}
          <a
            target="_blank"
            className="text-underline"
            href="https://pujamandu.com/"
          >
            <u>Pujamandu</u>
          </a>
          .
        </li>
      </ul>
    </>
  );
};

export default AboutMe;
