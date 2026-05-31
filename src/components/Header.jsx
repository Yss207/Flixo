import React, { useEffect, useState } from "react";
import logo from "../assets/flixo_logo_final.png";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGPTSearchView } from "../utils/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  const [activeTab, setActiveTab] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut(auth).catch(() => navigate("/error"));
  };

  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  };

  const handleLogoClick = () => {
    if (showGPTSearch) dispatch(toggleGPTSearchView());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        if (location.pathname === "/") navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const navItems = [
    { name: "Now Playing", id: "now-playing" },
    { name: "Popular", id: "popular" },
    { name: "Top Rated", id: "top-rated" },
    { name: "Upcoming", id: "upcoming" },
  ];

  return (
    // 🟢 FIXED LAYOUT:
    // 1. 'flex-col md:flex-row' -> Mobile: Stacked (Centered), Desktop: Row (Left/Right)
    // 2. 'bg-gradient-to-b' -> Ensures no harsh lines (Dead space fix)
    <div
      className={`fixed w-full px-4 md:px-12 py-2 z-50 flex flex-col md:flex-row justify-between items-center transition-all duration-500 ${
        isScrolled
          ? "bg-black/95 shadow-xl"
          : "bg-linear-to-b from-black via-black/60 to-transparent"
      }`}
    >
      {/* 1. LEFT SIDE: Logo & Navigation */}
      {/* 'w-full md:w-auto' ensures centering works on mobile */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 w-full md:w-auto">
        <img
          className="w-32 md:w-44 mx-auto md:mx-0 cursor-pointer hover:opacity-80 transition-opacity duration-200 drop-shadow-lg"
          src={logo}
          alt="logo"
          onClick={handleLogoClick}
        />

        {/* DESKTOP NAVBAR (Hidden on Mobile) */}
        {user && !showGPTSearch && (
          <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            {navItems.map((item) => (
              <li
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`cursor-pointer transition-all duration-200 hover:text-white ${
                  activeTab === item.id
                    ? "text-white font-bold border-b-2 border-red-600 pb-1"
                    : ""
                }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 2. RIGHT SIDE: User Actions */}
      {/* 'mt-2 md:mt-0' adds slight spacing on mobile without creating dead space */}
      {user && (
        <div className="flex items-center gap-3 md:gap-6 mt-2 md:mt-0">
          {/* WATCHLIST BUTTON */}
          <button
            onClick={() => navigate("/watchlist")}
            className="flex items-center gap-2 py-1.5 px-4 md:py-2 md:px-5 rounded-full font-bold border border-white/30 text-white text-xs md:text-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
            <span>Watchlist</span>
          </button>

          {/* GPT BUTTON */}
          <button
            className={`flex items-center gap-2 py-1.5 px-4 md:py-2 md:px-5 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg text-xs md:text-sm ${
              showGPTSearch
                ? "bg-gray-200 text-black hover:bg-white"
                : "bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:shadow-[0_0_15px_rgba(129,140,248,0.5)] border border-purple-400/30"
            }`}
            onClick={handleGPTSearchClick}
          >
            {showGPTSearch ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Home</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                <span>Ask AI</span>
              </>
            )}
          </button>

          {/* USER PROFILE */}
          <div className="group relative flex items-center gap-2 cursor-pointer bg-black/20 p-1 rounded-full md:bg-transparent md:p-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-600 flex items-center justify-center border-2 border-white/20 group-hover:border-white transition-all duration-300 shrink-0">
              <span className="text-white font-bold text-sm select-none">
                {user?.displayName?.[0]?.toUpperCase() || "U"}
              </span>
            </div>

            <div className="flex flex-col items-start pr-2">
              <span className="text-white text-xs md:text-sm font-semibold hidden md:block leading-none">
                {user.displayName?.split(" ")[0] || "User"}
              </span>
              <button
                onClick={handleSignOut}
                className="text-gray-300 text-[10px] md:text-xs hover:text-red-500 font-bold uppercase tracking-wider transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
