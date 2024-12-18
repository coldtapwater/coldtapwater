import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Research = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock body scroll when component mounts
    document.body.style.overflow = 'hidden';
    
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
      // Restore body scroll when component unmounts
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-background-color overflow-hidden">
      <div className="h-full pt-20">
        <div className="container mx-auto px-4 h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black/30 rounded-xl p-8 h-[calc(100%-3rem)]"
          >
            <h1 className="font-tag text-4xl md:text-5xl mb-6 tracking-wider text-gradient">
              PRISM Research Paper
            </h1>
            {isLoading ? (
              <div className="flex justify-center items-center h-[calc(100%-5rem)]">
                <div className="text-primary-color font-street text-xl">Loading PDF...</div>
              </div>
            ) : (
              <div className="w-full h-[calc(100%-5rem)] rounded-lg overflow-hidden">
                <object
                  data="/research/main.pdf"
                  type="application/pdf"
                  className="w-full h-full"
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
                </object>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Research;
