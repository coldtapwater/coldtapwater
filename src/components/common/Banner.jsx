import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Banner = () => {
  const location = useLocation();
  
  // Only show banner on SignUp page
  if (location.pathname !== '/signup') {
    return null;
  }

  return (
    <div className="fixed top-16 left-0 right-0 z-50 mx-auto px-4">
      <div className="max-w-7xl mx-auto p-5">
        <div className="flex items-center justify-between rounded-lg bg-[rgba(255,51,102,0.2)] p-5 border border-[rgba(255,51,102,0.3)]">
          <div className="flex items-center flex-1">
            <p className="ml-3 font-tag text-white truncate">
              <span className="md:hidden">Work in Progress!</span>
              <span className="hidden md:inline">
                This is a work in progress. Check out our hidden tools page!
              </span>
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/tools"
              className="github-link font-tag"
            >
              View Tools
            </Link>
          </div>
          <div className="ml-3 flex-shrink-0">
            <button
              type="button"
              className="flex rounded-md p-2 hover:bg-[rgba(255,51,102,0.3)] focus:outline-none"
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
