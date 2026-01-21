import React from "react";
import { useDispatch } from "react-redux";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { motion } from "framer-motion";

const AIFeatureBanner = () => {
  const dispatch = useDispatch();

  const handleGPTSearch = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(toggleGPTSearchView());
  };

  const floatVariant = (delay) => ({
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 5,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  });

  return (
    // 🟢 Reduced outer padding (md:py-24 instead of 32) for a tighter section
    <div className="relative w-full py-16 md:py-24 my-12 md:my-20 bg-linear-to-b from-black via-[#120f26] to-black overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-900/20 rounded-full blur-[80px] md:blur-[100px] -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4"
      >
        {/* LEFT SIDE: Text */}
        <div className="flex-1 text-center md:text-left z-10 pt-4 md:pt-0">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 tracking-tight leading-tight">
            Let AI find your <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
              Next Obsession.
            </span>
          </h2>

          <p className="text-sm md:text-lg text-gray-400 mb-6 md:mb-8 max-w-sm mx-auto md:mx-0 font-light leading-relaxed">
            Skip the scrolling. Type your mood (e.g., "Sad movies that end
            happy") and let our smart search handle the rest.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGPTSearch}
            className="bg-white text-black font-bold py-3 px-8 md:py-3 md:px-8 rounded-full text-sm md:text-base shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all"
          >
            ✨ Try AI Search
          </motion.button>
        </div>

        {/* 🟢 RIGHT SIDE: COMPACT VISUALS */}
        {/* Reduced height to h-[350px] on desktop so pills stay closer to center */}
        <div className="flex-1 relative w-full h-80 md:h-[350px] max-w-[350px] md:max-w-[500px] mx-auto">
          {/* Center Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-indigo-600/20 backdrop-blur-md rounded-full flex items-center justify-center border border-indigo-500/30 shadow-2xl z-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 md:w-10 md:h-10 text-indigo-300"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* 🟢 CORNER STRATEGY UPDATED:
              - Mobile: Still uses 0/0 to maximize space on small screens.
              - Desktop: Uses 10%/15% to pull pills INWARD towards the center.
           */}

          {/* Top Right */}
          <motion.div
            variants={floatVariant(0)}
            initial="initial"
            animate="animate"
            className="absolute top-0 right-0 md:top-[10%] md:right-[15%] bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 md:px-5 md:py-2 rounded-full text-xs md:text-sm text-gray-200 shadow-lg"
          >
            "90s Sci-Fi" 👽
          </motion.div>

          {/* Bottom Right */}
          <motion.div
            variants={floatVariant(1.5)}
            initial="initial"
            animate="animate"
            className="absolute bottom-0 right-0 md:bottom-[15%] md:right-[10%] bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 md:px-5 md:py-2 rounded-full text-xs md:text-sm text-gray-200 shadow-lg"
          >
            "Mind-bending" 🤯
          </motion.div>

          {/* Bottom Left */}
          <motion.div
            variants={floatVariant(2.5)}
            initial="initial"
            animate="animate"
            className="absolute bottom-0 left-0 md:bottom-[10%] md:left-[15%] bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 md:px-5 md:py-2 rounded-full text-xs md:text-sm text-gray-200 shadow-lg"
          >
            "Funny movies" 😂
          </motion.div>

          {/* Top Left */}
          <motion.div
            variants={floatVariant(3.5)}
            initial="initial"
            animate="animate"
            className="absolute top-0 left-0 md:top-[15%] md:left-[10%] bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 md:px-5 md:py-2 rounded-full text-xs md:text-sm text-gray-200 shadow-lg"
          >
            "Crime Thriller" 🕵️‍♂️
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIFeatureBanner;
