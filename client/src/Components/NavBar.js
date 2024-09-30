import React, { useState, useEffect } from "react";
import logo from "../Images/logo.png";
import ProfileIcon from "../Images/sec.png";
import { Link, useNavigate } from "react-router-dom";


function NavBar() {
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const adminStatus = localStorage.getItem("isAdmin");
  console.log("adminStatus", adminStatus);

   const navigate = useNavigate();

  // Check the admin status from localStorage on component mount
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus); // Set isAdmin state based on localStorage
  }, []);

  // Close the dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-programs") &&
        !event.target.closest(".dropdown-services")
      ) {
        setIsProgramsOpen(false);
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // Remove isAdmin from localStorage
    window.location.reload();
    // Redirect to the login page
  };

  return (
    <div>
      <header className="bg-slate-50 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto py-3">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10 w-auto md:h-16" />
          </Link>

          <ul className="flex gap-7 relative text-lg md:text-xl">
            <Link to="/">
              <li className="hidden sm:inline text-grNavText hover:scale-105 hover:text-grNavTextHov">
                Home
              </li>
            </Link>
            <Link to="./view-partnerships">
              <li className="hidden sm:inline text-grNavText hover:scale-105 hover:text-grNavTextHov">
                Home
              </li>
            </Link>
            <Link to="/">
              <li className="hidden sm:inline text-grNavText hover:scale-105 hover:text-grNavTextHov">
                Home
              </li>
            </Link>

            {/* Programs Dropdown */}
            <li
              className="text-grNavText hover:scale-105 hover:text-grNavTextHov cursor-pointer dropdown-programs relative"
              onClick={() => {
                setIsProgramsOpen(!isProgramsOpen);
                setIsServicesOpen(false); // Close the other dropdown
              }}
            >
              Programs
              {isProgramsOpen && (
                <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-48 z-50">
                  <Link to="./course-table">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      View Courses
                    </li>
                  </Link>
                  <Link to="./course">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Add Courses
                    </li>
                  </Link>
                </ul>
              )}
            </li>

            {/* Services Dropdown */}
            <li
              className="text-grNavText hover:scale-105 hover:text-grNavTextHov cursor-pointer dropdown-services relative"
              onClick={() => {
                setIsServicesOpen(!isServicesOpen);
                setIsProgramsOpen(false); // Close the other dropdown
              }}
            >
              Services
              {isServicesOpen && (
                <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-48 z-50">
                  <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                    Application Process
                  </li>
                  <Link to="./partnership-table">
                    <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                      Partnerships
                    </li>
                  </Link>
                  <Link to="/loan-app-list">
                    <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                      Loan Advisory
                    </li>
                  </Link>
                  <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                    <Link to="/LanguageTestPreparation">
                      Language Test Preparations
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <Link to="/eventMain">
              <li className="hidden sm:inline text-grNavText hover:scale-105 hover:text-grNavTextHov">
                Events
              </li>
            </Link>
            {adminStatus ? (
              <Link to="/ViewTransactions">
                <li className="hidden sm:inline text-grNavText hover:scale-105 hover:text-grNavTextHov">
                  Finance
                </li>
              </Link>
            ) : (
              ""
            )}

            <li className="hidden sm:inline text-grNavText hover:scale-105 hover:text-grNavTextHov">
              Feedbacks
            </li>
          </ul>

          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
              <img
                src={ProfileIcon}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Conditional Button */}
            <button
              className="text-white bg-grNavTextHov hover:bg-grNavText hover:scale-105 focus:outline-none font-medium rounded-2xl text-sm md:text-xl px-4 py-2"
              onClick={isAdmin ? handleLogout : () => navigate("/login")}
            >
              {isAdmin ? "Log out" : "Member Log in"}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavBar;
