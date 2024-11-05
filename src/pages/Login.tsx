import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Logic for login could go here if needed
    navigate('/home'); // Navigate to the homepage
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-5">WELCOME BACK</h2>

        <input
          className="mb-4 p-2 w-full border rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            className="mb-4 p-2 w-full border rounded pr-10"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 pr-3 cursor-pointer"
            style={{ top: '9px' }} // Adjusted the top position slightly
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Login
        </button>

        {/* Sign up prompt below the login button */}
        <p className="mt-4 text-left">
          If you don't have an account,{' '}
          <Link to="/signup" className="text-blue-500 underline">
            Sign up
          </Link>
        </p>
        <p className="mt-2 text-left">
          <Link to="/forgot-password" className="text-blue-500 underline">
            Forgot Password?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
