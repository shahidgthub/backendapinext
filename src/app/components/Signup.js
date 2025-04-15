'use client';
import React, { useState } from 'react';

const Signup = () => {
  // State variables
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle form submit
  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmpassword: confirmPassword,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.error("Signup error:", data.error);
        alert(data.error);
      } else {
        console.log("Success:", data.message);
        alert("Signup successful!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSignup} className="bg-gray-100 p-6 rounded-lg shadow-md w-1/3">
        <h1 className="text-2xl mb-4 text-center">Signup</h1>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <label htmlFor="username" className="block">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded w-full">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
