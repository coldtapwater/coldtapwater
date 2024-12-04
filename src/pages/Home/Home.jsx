import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { scrollY } = useScroll();
  const arrowOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-color" data-scroll-section>
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            className="w-full h-full bg-gradient-to-br from-primary-color/20 to-accent-color/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
        </div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-wandals text-7xl md:text-9xl mb-8 text-gradient tracking-wider">
              ColdTapWater
            </h1>
            <motion.p
              className="font-street text-2xl md:text-3xl text-gray-300 mb-12 tracking-wide leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Code Enthusiast | Art Dabbler | Professional Overthinker
            </motion.p>

            {/* Animated arrow indicating scroll */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              style={{ opacity: arrowOpacity }}
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-black/30" data-scroll-section>
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Portfolio Link */}
            <motion.div
              className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-primary-color/20 to-accent-color/20 p-8 hover-effect cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/portfolio')}
            >
              <h3 className="font-tag text-4xl md:text-5xl mb-6 tracking-wider text-gradient">Portfolio</h3>
              <p className="font-street text-xl text-gray-300 tracking-wide leading-relaxed">Check out my latest work</p>
            </motion.div>

            {/* About Link */}
            <motion.div
              className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-primary-color/20 to-accent-color/20 p-8 hover-effect cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/about')}
            >
              <h3 className="font-tag text-4xl md:text-5xl mb-6 tracking-wider text-gradient">About</h3>
              <p className="font-street text-xl text-gray-300 tracking-wide leading-relaxed">Get to know me better</p>
            </motion.div>

            {/* Art Link */}
            <motion.div
              className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-primary-color/20 to-accent-color/20 p-8 hover-effect cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/art')}
            >
              <h3 className="font-tag text-4xl md:text-5xl mb-6 tracking-wider text-gradient">Art</h3>
              <p className="font-street text-xl text-gray-300 tracking-wide leading-relaxed">Explore my creative side</p>
            </motion.div>

            {/* Blog Link */}
            <motion.div
              className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-primary-color/20 to-accent-color/20 p-8 hover-effect cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/blog')}
            >
              <h3 className="font-tag text-4xl md:text-5xl mb-6 tracking-wider text-gradient">Blog</h3>
              <p className="font-street text-xl text-gray-300 tracking-wide leading-relaxed">Read my latest thoughts</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
