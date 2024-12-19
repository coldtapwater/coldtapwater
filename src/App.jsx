import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';

// Components
import Navbar from './components/Navbar/Navbar';
import CustomCursor from './components/common/CustomCursor';
import Banner from './components/common/Banner';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import Research from './pages/Projects/Research';
import About from './pages/About/About';
import Art from './pages/Art/Art';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      multiplier: 1,
      lerp: 0.1,
      scrollFromAnywhere: true,
      resetNativeScroll: true
    });

    // Update scroll on route change
    const handleRouteChange = () => {
      if (scroll) {
        scroll.update();
        scroll.scrollTo(0, { duration: 0, disableLerp: true });
      }
    };

    handleRouteChange();

    // Cleanup
    return () => {
      if (scroll) scroll.destroy();
    };
  }, [location.pathname]); // Re-initialize on route change

  return (
    <div className="min-h-screen flex flex-col relative">
      <CustomCursor />
      <Navbar />
      <Banner />
      <main 
        data-scroll-container
        className="flex-1 relative"
        style={{ 
          minHeight: '100vh',
          overflow: 'hidden'
        }}
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-full"
              >
                <Home />
              </motion.div>
            } />
            <Route path="/portfolio" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-full"
              >
                <Projects />
              </motion.div>
            } />
            <Route path="/portfolio/research" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-full"
              >
                <Research />
              </motion.div>
            } />
            <Route path="/about" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-full"
              >
                <About />
              </motion.div>
            } />
            <Route path="/art" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-full"
              >
                <Art />
              </motion.div>
            } />
            <Route path="/blog" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-full"
              >
                <Blog />
              </motion.div>
            } />
            <Route path="/blog/:id" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-full"
              >
                <BlogPost />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
