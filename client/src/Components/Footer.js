import React from "react";
import logo from "../Images/logo.png";

function Footer() {
  return (
    <footer className="bg-white mt-auto">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <img
              src={logo}
              className="h-20 m-auto md:me-3"
              alt="Global Reach Logo"
            />
            <span className="self-center text-gray-500 text-lg">
              12 Schofield Pl, Colombo 00300 <br />
              globalreachcolombo@gmail.com <br />
              +94 77-222-4700
            </span>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-700 uppercase">
              Company
            </h2>
            <ul className="text-gray-500 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline" aria-label="About Us">
                  About Us
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline" aria-label="Location">
                  Location
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline" aria-label="Careers">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-700 uppercase">
              Resource
            </h2>
            <ul className="text-gray-500 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline" aria-label="FAQ">
                  FAQ
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline" aria-label="Blog">
                  Blog
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline" aria-label="News">
                  News
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-700 uppercase">
              Follow
            </h2>
            <ul className="text-gray-500 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline" aria-label="Facebook">
                  Facebook
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline" aria-label="Instagram">
                  Instagram
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline" aria-label="YouTube">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-1 border-gray-200 sm:mx-auto lg:my-2" />
      <div className="text-center py-2">
        <span className="text-sm text-gray-500">
          © 2023{" "}
          <a href="#" className="hover:underline">
            GlobalReach™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
