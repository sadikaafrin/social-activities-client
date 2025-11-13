import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../contex/AuthContext";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

const link = (
  <>
    <li>
      <NavLink to="/upcoming-events">Upcoming Events</NavLink>
    </li>
  </>
);

const NavBar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };
  const { user, signOutUserFunc } = use(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-sm max-w-7xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {link}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl">
          <img
            src="https://social-activity.cmsmasters.studio/wp-content/themes/social-activity/img/logo.png"
            alt=""
          />
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>
      <div className="navbar-end">
        {/* <NavLink to={'auth/register'} className="btn">Register</NavLink> */}
        <div className="navbar-end gap-3">
          {user ? (
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-9 border-2 border-gray-300 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    referrerPolicy="no-referrer"
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                <div className=" pb-3 border-b border-b-gray-200">
                  <li className="text-sm font-bold">{user.displayName}</li>
                  <li className="text-xs">{user.email}</li>
                </div>
                <li className="mt-3">
                  <Link to={"/profile"}>
                    <FaUser /> Profile
                  </Link>
                </li>

                <li>
                  <Link to={"/addEvent"}>Create Event</Link>
                </li>
                <li>
                  <Link to={"/myCreatedEvent"}>MY Created Event</Link>
                </li>
                <li>
                  <Link to={"/myJoinEvent"}>My join Event</Link>
                </li>

                {/* <li >
                <Link to={"/my-downloads"}>
                 My Downloads
                </Link>
              </li> */}

                <input
           onChange={(e)=> handleTheme(e.target.checked)}
           type="checkbox"
           defaultChecked={localStorage.getItem('theme') === "dark"}
           className="toggle"/>

                {/* <li>
                <a>
                  {" "}
                  <FaGear /> Settings
                </a>
              </li> */}
                <li>
                  <button
                    onClick={signOutUserFunc}
                    className="btn btn-xs text-left bg-linear-to-r  text-white bg-[#3c576e]"
                  >
                    <IoLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={"/auth/login"}
              className="btn rounded-full border-gray-300  btn-sm bg-[#b83d46] text-white"
            >
              {" "}
              <IoLogIn /> Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
