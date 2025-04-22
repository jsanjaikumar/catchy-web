import React, { useState } from "react";
import "../styles/LoginSignUp.css";
import { LOGIN_URL, SIGN_UP_URL } from "../helper/apiurls";
import Cookies from "js-cookie";
const LoginSignUp = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    role: "donor",
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(SIGN_UP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registration successful!");
        Cookies.set("token", data?.token);
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Login successful!");
        Cookies.set("token", data?.token);
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      id='container'
    >
      {/* Sign Up */}
      <div className='form-container sign-up-container'>
        <form onSubmit={handleSignUp}>
          <h1>Create Account</h1>

          <input
            type='text'
            name='username'
            placeholder='Name'
            value={signUpData.username}
            onChange={handleSignUpChange}
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={signUpData.email}
            onChange={handleSignUpChange}
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={signUpData.password}
            onChange={handleSignUpChange}
            required
          />
          <select
            name='role'
            value={signUpData.role}
            onChange={handleSignUpChange}
            required
          >
            <option value=''>Select Role</option>
            <option value='donor'>Donor</option>
            <option value='recipient'>Recipient</option>
            <option value='volunteer'>Volunteer</option>
          </select>

          <button type='submit'>Sign Up</button>
        </form>
      </div>

      {/* Sign In */}
      <div className='form-container sign-in-container'>
        <form onSubmit={handleSignIn}>
          <h1>Sign in</h1>

          <input
            type='email'
            name='email'
            placeholder='Email'
            value={signInData.email}
            onChange={handleSignInChange}
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={signInData.password}
            onChange={handleSignInChange}
            required
          />
          <button type='submit'>Sign In</button>
        </form>
      </div>

      {/* Overlay */}
      <div className='overlay-container'>
        <div className='overlay'>
          <div className='overlay-panel overlay-left'>
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              className='ghost'
              onClick={() => setIsRightPanelActive(false)}
            >
              Sign In
            </button>
          </div>
          <div className='overlay-panel overlay-right'>
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button
              className='ghost'
              onClick={() => setIsRightPanelActive(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
