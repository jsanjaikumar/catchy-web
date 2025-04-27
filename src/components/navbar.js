import React from "react";
import "../styles/navbar.css";
import Logo from "../assets/logo.jpeg";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const role = Cookies.get("role");
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const handleSignOUt = () => {
    if (token) {
      Cookies.remove("token");
      navigate("/");
    }
  };
  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <img src={Logo} alt='Logo' className='logo' />
      </div>
      <div className='navbar-right'>
        {role == "donor" && (
          <>
            <a href='/donatefood' className='nav-link'>
              Donate Food
            </a>
            <a href='/mydonations' className='nav-link'>
              My Donations
            </a>
          </>
        )}
        {role == "recipient" && (
          <>
            <a href='/foodlistings' className='nav-link'>
              Food Listings
            </a>

            <a href='/myrequests' className='nav-link'>
              My Requests
            </a>
          </>
        )}
        {role == "volunteer" && (
          <>
            <a href='/volunteer' className='nav-link'>
              Food Requests
            </a>
            <a href='/map' className='nav-link'>
              Map
            </a>
          </>
        )}
        <button className='sign-out-btn' onClick={() => handleSignOUt()}>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
