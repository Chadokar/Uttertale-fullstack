import React, { useEffect, useState } from "react";
import "./navbar.css";
import Logo from "../assets/images/Logo.svg";
import { Link, NavLink, Outlet } from "react-router-dom";
import ContactBottom from "./ContactBottom";
import { Button, Font } from "../../styling/Styles";
import { AlignJustify, Logores } from "../assets/Icons";

// function useWindowSize() {
//   const [size, setSize] = useState([window.innerHeight,window.innerWidth])
//   useEffect(() => {
//     const handleResize = () =>{
//       setSize([window.innerHeight, window.innerWidth]);
//     };
//     window.addEventListener("resize",handleResize);
//   },[] );
//   return size;
// }

function Navbar() {
  // const [height, width] = useWindowSize();
  return (
    <>
      <div className="flex justify-center w-full nav-rectangle">
        <div className="navbar flex justify-between flex-row items-center p-4">
          <Link to="/" className="logo">
            <img src={Logo} alt="" />
            <div className="resp-logo">
              <AlignJustify color="#242424" />
              <Logores />
            </div>
          </Link>
          <div className="tabs flex flex-row items-start justify-center gap-2 px-2">
            <NavLink to="/about">
              <p className={`${Font.subheadline} ${Font.medium} ${Font.font}`}>
                About Us
              </p>
            </NavLink>
            <NavLink to="/blog">
              <p className={`${Font.subheadline} ${Font.medium} ${Font.font}`}>
                Blog
              </p>
            </NavLink>
            <NavLink to="/contact">
              <p className={`${Font.subheadline} ${Font.medium} ${Font.font}`}>
                Contact Us
              </p>
            </NavLink>
          </div>
          <a className="" href="/sign-in">
            <button
              className={`${Button.button} ${Button.secondary} ${Button.medium} resp`}
            >
              <p
                className={`${Font.font} ${Font.body2} ${Font.medium}`}
                style={{ color: "#242424" }}
              >
                Sign In
              </p>
            </button>
            <button
              className={`${Button.button} ${Button.secondary} ${Button.large} desktop`}
            >
              <p
                className={`${Font.font} ${Font.body1} ${Font.medium}`}
                style={{ color: "#242424" }}
              >
                Sign In
              </p>
            </button>
          </a>
        </div>
      </div>
      <Outlet />
      <ContactBottom />
    </>
  );
}

export default Navbar;
