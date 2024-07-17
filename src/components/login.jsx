/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

const Login = ({ onLoginSuccess }) => {
  const [loginResult, setLoginResult] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulate login logic
    setLoginResult(true);
    onLoginSuccess();

    // Print username and password to console
    console.log("Username:", username);
    console.log("Password:", password);

    // Reset username and password fields
    setUsername('');
    setPassword('');
  };

  const handleAnonymousLogin = () => {
    // Simulate login logic
    setLoginResult(true);
    onLoginSuccess();

    // Print username and password to console
    console.log("Username:", 'Anonymous');
    console.log("Password:", 'Anonymous');

    // Reset username and password fields
    setUsername('');
    setPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-80 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
        <button
          onClick={handleAnonymousLogin}
          className="w-full mt-2 py-2 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition duration-200"
        >
          Login as Anonymous
        </button>
        {loginResult && (
          <p className="mt-4 text-green-500 text-center">Login successful</p>
        )}
      </div>
    </div>
  );
};

export default Login;
