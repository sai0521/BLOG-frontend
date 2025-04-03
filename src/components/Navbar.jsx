import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PlusIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold tracking-tight hover:text-indigo-100 transition-colors">
          BlogHub
        </Link>
        
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link 
                to="/create" 
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
              >
                <PlusIcon className="h-5 w-5" />
                <span className="hidden md:inline font-medium">Create Post</span>
              </Link>
              
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 hover:text-indigo-100 transition-colors"
                >
                  <UserCircleIcon className="h-6 w-6" />
                  <span className="hidden md:inline truncate max-w-[150px]">{user.email}</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100 transform origin-top-right transition-all duration-200">
                    <Link
                      to="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        logout();
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="hover:text-indigo-100 transition-colors font-medium"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 rounded-full bg-white text-indigo-600 font-medium hover:bg-indigo-100 transition-all duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;