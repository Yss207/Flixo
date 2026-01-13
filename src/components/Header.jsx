import React, { useEffect, useState } from "react";
import logo from "../assets/flixo_logo_final.png";
import userIcon from "../assets/avatar.png";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGPTSearchView } from "../utils/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

  // 🟢 State to track which tab is currently "Glowing"
  const [activeTab, setActiveTab] = useState("");

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  };

  // 🟢 LOGO CLICK HANDLER: Smart Home Button
  const handleLogoClick = () => {
    // 1. If on GPT Search page, close it to go back to Home
    if (showGPTSearch) {
      dispatch(toggleGPTSearchView());
    }
    // 2. Always scroll to the very top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🟢 SCROLL HANDLER: Finds the section by ID and slides to it
  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId); // Set the glow
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  // 🟢 NAVIGATION ITEMS CONFIG
  const navItems = [
    { name: "Now Playing", id: "now-playing" },
    { name: "Popular", id: "popular" },
    { name: "Top Rated", id: "top-rated" },
    { name: "Upcoming", id: "upcoming" },
  ];

  return (
    <div className="fixed w-full px-8 py-2 bg-gradient-to-b from-black z-50 flex flex-col md:flex-row justify-between items-center transition-all duration-300">
      {/* 1. Left Side: Logo & Navigation */}
      <div className="flex items-center gap-8">
        <img
          className="w-44 mx-auto md:mx-0 cursor-pointer hover:scale-105 transition-transform duration-200"
          src={logo}
          alt="logo"
          onClick={handleLogoClick}
        />

        {/* 🟢 DESKTOP NAVBAR */}
        {user && !showGPTSearch && (
          <ul className="hidden md:flex gap-6 text-white text-sm font-medium">
            {navItems.map((item) => (
              <li
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`cursor-pointer transition-all duration-200 hover:text-red-300 
                  ${
                    activeTab === item.id
                      ? "text-red-600 font-bold drop-shadow-[0_0_8px_rgba(220,38,38,0.8)] scale-105"
                      : "text-gray-300"
                  }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 2. Right Side: User Actions */}
      {user && (
        <div className="flex items-center gap-4 p-4">
          <button
            className="py-2 px-4 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors shadow-lg"
            onClick={handleGPTSearchClick}
          >
            {showGPTSearch ? "Homepage" : "GPT Search"}
          </button>

          <img
            src={user?.photoURL || userIcon}
            alt="userIcon"
            className="hidden md:block w-12 h-12 rounded-md object-cover border-2 border-transparent hover:border-white transition-all"
          />

          <button
            onClick={handleSignOut}
            className="font-bold text-white hover:text-red-500 transition-colors whitespace-nowrap"
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
