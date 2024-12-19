import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Research = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable Locomotive Scroll
    const scrollContainer = document.querySelector('[data-scroll-container]');
    if (scrollContainer) {
      scrollContainer.style.overflow = 'hidden';
      scrollContainer.style.height = '100vh';
    }
    
    // Preload the PDF
    const pdfUrl = '/research/main.pdf';
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'object';
    link.href = pdfUrl;
    document.head.appendChild(link);

    // Set loading to false after a brief delay to ensure PDF starts loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    
    // Cleanup function
    return () => {
      clearTimeout(timer);
      document.head.removeChild(link);
      // Re-enable Locomotive Scroll
      if (scrollContainer) {
        scrollContainer.style.removeProperty('overflow');
        scrollContainer.style.removeProperty('height');
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-background-color">
      <div className="h-screen pt-20">
        <div className="container mx-auto px-4 h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black/30 rounded-xl p-8 h-[calc(100%-3rem)] flex flex-col"
          >
            <h1 className="font-tag text-4xl md:text-5xl mb-6 tracking-wider text-gradient flex-shrink-0">
              PRISM Research Paper
            </h1>
            {isLoading ? (
              <div className="flex justify-center items-center flex-grow">
                <div className="text-primary-color font-street text-xl">Loading PDF...</div>
              </div>
            ) : (
              <div className="flex-grow w-full rounded-lg overflow-hidden">
                <iframe
                  src="/research/main.pdf"
                  className="w-full h-full"
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent'
                  }}
                >
                  <p className="text-center py-4 font-street">
                    Your browser doesn't support PDF viewing. You can{' '}
                    <a
                      href="/research/main.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-color hover:text-accent-color underline"
                    >
                      download the PDF here
                    </a>
                    .
                  </p>
                </iframe>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Research;
