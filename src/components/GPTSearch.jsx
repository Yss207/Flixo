import React from "react";
import GPTSearchbar from "./GPTSearchbar";
import GPTMovieSuggest from "./GPTMovieSuggest";
import first_bg from "../assets/first_bg.png";
import { motion } from "framer-motion"; // 🟢 Import Animation Library

const GPTSearch = () => {
  return (
    <>
      {/* Background Image Container */}
      <div className="fixed -z-10 w-full h-full">
        <img
          src={first_bg}
          alt="bg"
          className="h-screen w-screen object-cover"
        />
        {/* Optional: Dark Overlay to make text pop */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      </div>

      {/* Main Content */}
      <div className="pt-[30%] md:pt-[10%]">
        {/* 🟢 NEW: Animated Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center text-white px-4"
        >
          <h1 className="text-3xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-600 drop-shadow-lg pb-2">
            Let AI be your Movie Guru
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 font-light">
            "Feeling sad? Want a 90s action thriller? Or a movie like
            Interstellar?"
            <br />
            <span className="text-gray-400 text-sm md:text-base">
              Just type it below and watch the magic happen.
            </span>
          </p>
        </motion.div>

        <GPTSearchbar />
        <GPTMovieSuggest />
      </div>
    </>
  );
};

export default GPTSearch;
