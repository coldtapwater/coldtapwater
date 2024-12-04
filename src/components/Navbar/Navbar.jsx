import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFont } from '../../context/FontContext';
import { useState } from 'react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Art', path: '/art' },
  { name: 'Blog', path: '/blog' },
];

const Navbar = () => {
  const { fontStyle, toggleFontStyle } = useFont();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="/" className="font-wandals text-4xl text-gradient tracking-wider">
              coldtapwater
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-10">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className="font-nav text-2xl text-gray-300 hover:text-white transition-colors duration-300 tracking-wider"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Desktop Font Style Dropdown */}
              <select
                value={fontStyle}
                onChange={(e) => toggleFontStyle(e.target.value)}
                className="bg-transparent text-gray-300 font-['Arial'] text-lg tracking-wide border-none outline-none cursor-pointer hover:text-white transition-colors duration-300 appearance-none px-3 py-1"
                style={{
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1em',
                  paddingRight: '2rem'
                }}
              >
                <option value="" disabled selected>Select Font</option>
                <option value="Default" className="bg-[#111111] font-['Arial']">Default</option>
                <option value="EasyRead" className="bg-[#111111] font-['Arial']">EasyRead</option>
              </select>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors duration-300"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu */}
              <svg
                className="block h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen 
                    ? "M6 18L18 6M6 6l12 12" // X icon when open
                    : "M4 6h16M4 12h16M4 18h16" // Hamburger icon when closed
                  }
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-4 pt-2 pb-4 space-y-3 bg-black/90 backdrop-blur-sm">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                onClick={closeMobileMenu}
                className="font-nav text-xl text-gray-300 hover:text-white block px-4 py-3 rounded-md tracking-wider transition-colors duration-300"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          
          {/* Mobile Font Style Dropdown */}
          <div className="px-4 py-3">
            <select
              value={fontStyle}
              onChange={(e) => toggleFontStyle(e.target.value)}
              className="w-full bg-gray-800/50 text-gray-300 font-['Arial'] text-lg tracking-wide rounded-md cursor-pointer hover:text-white transition-colors duration-300 appearance-none px-4 py-2 border border-gray-700 focus:outline-none focus:border-gray-500"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1em',
                paddingRight: '2.5rem'
              }}
            >
              <option value="" disabled selected>Select Font</option>
              <option value="Default" className="bg-[#111111] font-['Arial']">Default</option>
              <option value="EasyRead" className="bg-[#111111] font-['Arial']">EasyRead</option>
            </select>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
