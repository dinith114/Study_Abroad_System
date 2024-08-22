import React, { useState } from "react";
import logo from "../Images/logo.png";
import ProfileIcon from "../Images/sec.png";
import { Link } from "react-router-dom";

function NavBar() {
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <div>
      <header className="bg-slate-50 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto py-3">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10 w-auto md:h-16" />
          </Link>

          <ul className="flex gap-7 relative text-lg md:text-xl">
            <li
              className="text-grNavText hover:scale-105 hover:text-grNavTextHov cursor-pointer"
              onMouseEnter={() => setIsProgramsOpen(true)}
              onMouseLeave={() => setIsProgramsOpen(false)}
            >
              Programs
              {isProgramsOpen && (
                <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-48">
                  <li className="px-4 py-2 hover:bg-gray-200">Program 1</li>
                  <li className="px-4 py-2 hover:bg-gray-200">Program 2</li>
                  <li className="px-4 py-2 hover:bg-gray-200">Program 3</li>
                </ul>
              )}
            </li>
            <li
              className="text-grNavText hover:scale-105 hover:text-grNavTextHov cursor-pointer"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              Services
              {isServicesOpen && (
                <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-48">
                  <li className="px-4 py-2 hover:bg-gray-200">Service 1</li>
                  <li className="px-4 py-2 hover:bg-gray-200">Service 2</li>
                  <li className="px-4 py-2 hover:bg-gray-200">Service 3</li>
                </ul>
              )}
            </li>
            <li className="hidden sm:inline text-grNavText hover:scale-105 hover:text-grNavTextHov">
              Events
            </li>
            <li className="hidden sm:inline text-grNavText hover:scale-105 hover:text-grNavTextHov">
              Finance
            </li>
            <li className="hidden sm:inline text-grNavText hover:scale-105 hover:text-grNavTextHov">
              Feedbacks
            </li>
          </ul>
          <div className="flex items-center space-x-4 ">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
              <img
                src={ProfileIcon}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <button className="text-white bg-grNavTextHov hover:bg-grNavText hover:scale-105 focus:outline-none font-medium rounded-2xl text-sm md:text-xl px-4 py-2">
              Log out
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavBar;
