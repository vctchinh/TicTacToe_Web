import React, { useState, useRef } from "react";
import {
  Moon,
  Sun,
  User,
  Plus,
  ArrowLeft,
  Settings,
  Gamepad2,
} from "lucide-react";

import TicTacToe from "./tictactoe";

function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [result, setResult] = useState("");

  const number1 = useRef("");
  const number2 = useRef("");

  const handleChangea = (e) => {
    let value = e.target.value;
    number1.current = value;
    e.target.value = value;
  };

  const handleChangeb = (e) => {
    let value = e.target.value;
    number2.current = value;
    e.target.value = value;
  };

  const calculateResult = () => {
    const sNum1 = number1.current;
    const sNum2 = number2.current;

    const isValid1 = /^[+-]?([0-9]+(\.[0-9]*)?|\.[0-9]+)$/.test(sNum1);
    const isValid2 = /^[+-]?([0-9]+(\.[0-9]*)?|\.[0-9]+)$/.test(sNum2);

    if (!isValid1 || !isValid2) {
      alert("Error!! You can only enter numeric characters");
      return;
    }

    const parts1 = sNum1.split(".");
    const parts2 = sNum2.split(".");

    if (parts1.length > 2 || parts2.length > 2) {
      alert("Error!! Decimal numbers must contain only one decimal point");
      return;
    }

    const num1 = parseFloat(number1.current);
    const num2 = parseFloat(number2.current);
    const sum = num1 + num2;
    const roundedSum = Math.round(sum * 10000000000) / 10000000000;

    setResult(roundedSum);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigateToProfile = () => {
    setCurrentView("profile");
  };

  const navigateToGame = () => {
    setCurrentView("game");
  };

  const navigateToHome = () => {
    setCurrentView("home");
  };

  const ProfileView = () => (
    <div
      className={`h-auto w-full overflow-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 ${
        isDarkMode ? "bg-slate-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-3 ${
              isDarkMode ? "text-slate-200" : "text-slate-800"
            }`}
          >
            PROFILE
          </h1>
          <div className="w-16 sm:w-24 h-1 mx-auto bg-emerald-400 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* About Me Section */}
          <div
            className={`p-6 md:p-8 rounded-2xl transition-all duration-300 ${
              isDarkMode
                ? "bg-slate-800/50 border-2 border-slate-600"
                : "bg-white border-2 border-gray-200 shadow-xl"
            }`}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-1 h-6 md:h-8 bg-emerald-400 rounded-full"></div>
              <h2
                className={`text-2xl md:text-3xl font-bold ${
                  isDarkMode ? "text-slate-200" : "text-slate-800"
                }`}
              >
                About me
              </h2>
            </div>
            <p
              className={`text-sm md:text-base leading-relaxed ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              I'm a passionate computer science student with a keen interest in
              web development, artificial intelligence, and creating interactive
              digital experiences. Currently pursuing my degree at VNU-HCM
              University of Science, I enjoy combining creativity with
              technology to build innovative solutions.
            </p>
          </div>

          {/* Avatar Section */}
          <div className="flex justify-center items-start pt-4 md:pt-8 order-first lg:order-none">
            <img
              src="/avatar_TC.jpg"
              alt="avatar"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div
            className={`p-6 md:p-8 rounded-2xl transition-all duration-300 ${
              isDarkMode
                ? "bg-slate-800/50 border-2 border-slate-600"
                : "bg-white border-2 border-gray-200 shadow-xl"
            }`}
          >
            <div className="flex items-start gap-3 mb-4 md:mb-6">
              <div className="w-1 h-6 md:h-8 bg-emerald-400 rounded-full"></div>
              <h2
                className={`text-2xl md:text-3xl font-bold ${
                  isDarkMode ? "text-slate-200" : "text-slate-800"
                }`}
              >
                Details
              </h2>
            </div>
            <dl className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-base md:text-lg">▸</span>
                <div className="flex-1">
                  <dt
                    className={`font-bold mb-1 text-sm md:text-base ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Name:
                  </dt>
                  <dd
                    className={`text-sm md:text-base ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Võ Cao Tâm Chính
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-base md:text-lg">▸</span>
                <div className="flex-1">
                  <dt
                    className={`font-bold mb-1 text-sm md:text-base ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Age:
                  </dt>
                  <dd
                    className={`text-sm md:text-base ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    20 years
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-base md:text-lg">▸</span>
                <div className="flex-1">
                  <dt
                    className={`font-bold mb-1 text-sm md:text-base ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Location:
                  </dt>
                  <dd
                    className={`text-sm md:text-base ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Ho Chi Minh City
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-base md:text-lg">▸</span>
                <div className="flex-1">
                  <dt
                    className={`font-bold mb-1 text-sm md:text-base ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    University:
                  </dt>
                  <dd
                    className={`text-sm md:text-base ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    VNU-HCM University of Science
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-base md:text-lg">▸</span>
                <div className="flex-1">
                  <dt
                    className={`font-bold mb-1 text-sm md:text-base ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Phone:
                  </dt>
                  <dd
                    className={`text-sm md:text-base ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    +84 399xxxxxx
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-base md:text-lg">▸</span>
                <div className="flex-1">
                  <dt
                    className={`font-bold mb-1 text-sm md:text-base ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Email:
                  </dt>
                  <dd
                    className={`text-sm md:text-base break-all ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    23120194@student.hcmus.edu.vn
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50"
      }`}
    >
      <div className="flex items-center justify-between h-16 sm:h-20 w-full px-4 sm:px-5">
        {currentView !== "home" && (
          <button
            type="button"
            onClick={navigateToHome}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
              isDarkMode
                ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                : "bg-white text-indigo-600 hover:bg-indigo-50 shadow-md"
            }`}
          >
            <ArrowLeft size={24} className="sm:w-8 sm:h-8" />
          </button>
        )}
        {currentView === "home" && <div></div>}
        <button
          type="button"
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
            isDarkMode
              ? "bg-slate-700 text-amber-300 hover:bg-slate-600"
              : "bg-white text-indigo-600 hover:bg-indigo-50 shadow-md"
          }`}
        >
          {isDarkMode ? (
            <Sun size={24} className="sm:w-8 sm:h-8" />
          ) : (
            <Moon size={24} className="sm:w-8 sm:h-8" />
          )}
        </button>
      </div>

      {currentView === "home" && (
        <div className="flex flex-col md:flex-row justify-center items-center h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] gap-4 md:gap-0 p-4">
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <button
              type="button"
              onClick={navigateToProfile}
              className={`w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 border-2 rounded-xl flex justify-center items-center transition-all duration-300 hover:scale-105 active:scale-95 ${
                isDarkMode
                  ? "border-slate-600 bg-slate-800/50 text-blue-400 hover:bg-slate-700/50 hover:border-blue-500 shadow-lg shadow-blue-500/20"
                  : "border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 shadow-xl"
              }`}
            >
              <User
                className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
                strokeWidth={0.5}
              />
            </button>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <button
              type="button"
              onClick={navigateToGame}
              className={`w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 border-2 rounded-xl flex justify-center items-center transition-all duration-300 hover:scale-105 active:scale-95 ${
                isDarkMode
                  ? "border-slate-600 bg-slate-800/50 text-emerald-400 hover:bg-slate-700/50 hover:border-emerald-500 shadow-lg shadow-emerald-500/20"
                  : "border-indigo-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 shadow-xl"
              }`}
            >
              <Gamepad2
                className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
                strokeWidth={0.5}
              />
            </button>
          </div>
        </div>
      )}

      {currentView === "profile" && <ProfileView />}
      {currentView === "game" && (
        <TicTacToe isDarkMode={isDarkMode}></TicTacToe>
      )}
    </div>
  );
}

export default HomePage;
