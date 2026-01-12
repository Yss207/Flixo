import React from "react";
import GPTSearchbar from "./GPTSearchbar";
import GPTMovieSuggest from "./GPTMovieSuggest";
import first_bg from "../assets/first_bg.png";

const GPTSearch = () => {
  return (
    <>
      {/* Background Image Container */}
      <div className="fixed -z-10 w-full h-full">
        <img
          src={first_bg}
          alt="bg"
          // 🟢 ADDED: 'h-screen w-screen object-cover'
          // This ensures the image covers the full height/width without distortion
          className="h-screen w-screen object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="">
        {" "}
        {/* Optional: Add pt-[30%] if you need more top spacing on mobile */}
        <GPTSearchbar />
        <GPTMovieSuggest />
      </div>
    </>
  );
};

export default GPTSearch;
 