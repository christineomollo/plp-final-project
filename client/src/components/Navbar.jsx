import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // 1. Theme State for UI/Button text
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // 2. Load theme on component mount
  useEffect(() => {
    // Get saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    
    // Check for system preference only if no theme is saved
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);
    setIsDarkMode(initialTheme === 'dark');
  }, []);

  // 3. Theme Toggle Function
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setIsDarkMode(!isDarkMode); // Update the state
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">💖</span>
            <span className="text-xl font-bold gradient-text">BurBestie</span>
          </Link>

          {/* Navigation Links and Actions */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Standard Links */}
            <Link to="/" className="text-gray-700 hover:text-bestie-purple transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-bestie-purple transition-colors font-medium">
              About
            </Link>

            {/* Authenticated Links/Actions */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                <Link to="/dashboard" className="text-gray-700 hover:text-bestie-purple transition-colors font-medium">
                  Dashboard
                </Link>
                <Link to="/community" className="text-gray-700 hover:text-bestie-purple transition-colors font-medium">
                  Community
                </Link>
                
                {/* User Info & Logout */}
                <span className="text-sm text-gray-600 font-medium ml-4">
                  Welcome, {user?.username || 'Bestie'}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-secondary btn-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              /* Public Actions */
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-bestie-purple transition-colors font-medium">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary btn-sm">
                  Join Now
                </Link>
              </div>
            )}
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`btn-secondary btn-sm ml-4 border-2 border-bestie-purple text-bestie-purple hover:bg-bestie-lavender transition-all duration-300 ${isDarkMode ? 'bg-bestie-purple text-white hover:bg-bestie-lilac' : 'bg-white'}`}
              title="Toggle Theme"
            >
              <span className="text-lg">{isDarkMode ? '🌞' : '🌙'}</span>
            </button>
          </div>

          {/* Mobile Menu Button (Theme Toggle included on mobile) */}
          <div className="md:hidden flex items-center space-x-3">
             <button
              onClick={toggleTheme}
              className="p-1 rounded-full text-gray-700 hover:text-bestie-purple transition-all duration-300"
              title="Toggle Theme"
            >
              <span className="text-xl">{isDarkMode ? '🌞' : '🌙'}</span>
            </button>
            <button className="text-gray-700 hover:text-bestie-purple p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;