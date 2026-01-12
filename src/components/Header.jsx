import React, { useEffect } from "react";
import logo from "../assets/flixo_logo_final.png";
import userIcon from "../assets/avatar.png"; // Ensure this is imported
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

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-full px-8 py-2 bg-linear-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center">
      {/* Logo: Centered on mobile, Left aligned on desktop */}
      <img className="w-44 mx-auto md:mx-0" src={logo} alt="logo" />

      {user && (
        <div className="flex items-center gap-4 p-4">
          {/* GPT Search Button */}
          <button
            className="py-2 px-4 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
            onClick={handleGPTSearchClick}
          >
            {showGPTSearch ? "Homepage" : "GPT Search"}
          </button>

          {/* User Avatar */}
          <img
            src={user?.photoURL || userIcon}
            alt="userIcon"
            className="hidden md:block w-12 h-12 rounded-md object-cover"
          />

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="font-bold text-white hover:underline whitespace-nowrap"
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
