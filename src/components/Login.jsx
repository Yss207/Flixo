import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { motion } from "framer-motion";
import bgImage from "../assets/first_bg.png";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    setIsLoading(true);

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/1?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => {
              setErrorMessage(error.message);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
          setIsLoading(false);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then(() => {})
        .catch((error) => {
          setErrorMessage("Invalid Email or Password");
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black font-sans">
      <Header />

      {/* 1. BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt="background"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/60"></div>
      </div>

      {/* 2. MAIN HERO CONTAINER */}
      <div className="relative z-10 flex flex-col md:flex-row justify-center items-center h-full px-6 md:px-20 gap-10 md:gap-20">
        {/* 🟢 THE HERO SECTION (Text Explainer) */}
        {/* This appears mainly on Desktop to explain the app */}
        <div className="text-white text-center md:text-left max-w-2xl mt-5 md:mt-0">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
          >
            Unlimited movies, <br />
            <span className="text-red-600">AI-powered</span> suggestions.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl font-light text-gray-200 mb-6"
          >
            End the scroll. Start the movie. <br />
            <span className="font-semibold">
              Confused what to watch? Just ask AI.
            </span>
          </motion.p>
        </div>

        {/* 3. THE LOGIN FORM */}
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md p-8 md:p-12 bg-black/80 backdrop-blur-sm rounded-lg shadow-2xl border border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h2>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="w-full p-4 mb-4 bg-[#333] text-white rounded outline-none focus:bg-[#444] border-b-2 border-transparent focus:border-red-600 transition-all"
            />
          )}

          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="w-full p-4 mb-4 bg-[#333] text-white rounded outline-none focus:bg-[#444] border-b-2 border-transparent focus:border-red-600 transition-all"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-4 mb-4 bg-[#333] text-white rounded outline-none focus:bg-[#444] border-b-2 border-transparent focus:border-red-600 transition-all"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm font-bold mb-4">
              ⚠️ {errorMessage}
            </p>
          )}

          <button
            className="w-full p-4 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-all disabled:opacity-50"
            onClick={handleButtonClick}
            disabled={isLoading}
          >
            {isLoading
              ? "Processing..."
              : isSignInForm
                ? "Sign In"
                : "Get Started"}
          </button>

          <div className="mt-6 text-gray-400 text-sm">
            {isSignInForm ? "New to Flixo? " : "Already have an account? "}
            <span
              className="text-white hover:underline cursor-pointer font-medium"
              onClick={toggleSignInForm}
            >
              {isSignInForm ? "Sign up now." : "Sign in."}
            </span>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
