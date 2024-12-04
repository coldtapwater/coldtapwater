import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFont } from '../../context/FontContext';
import allCaptions from '../../data/photoartcaptions/index';

const Art = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const { fontStyle } = useFont();

  // Use the same font as headers based on fontStyle
  const headerFont = fontStyle === 'EasyRead' ? 'TrashHand' : 'aAnotherTag';

  return (
    <div className="min-h-screen bg-background-color pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 
            className="font-tag text-4xl md:text-5xl mb-8 tracking-wider text-gradient text-center"
            style={{ fontFamily: headerFont }}
          >
            Art & Photo Gallery
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCaptions.map((caption, index) => (
              <motion.div
                key={caption.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="art-item"
                onMouseEnter={() => setHoveredId(caption.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="image-container">
                  <img
                    src={caption.imageUrl}
                    alt={caption.title}
                    className="art-image"
                  />
                  {hoveredId === caption.id && (
                    <div className="caption-overlay">
                      <div className="caption-content">
                        <h3 
                          className="font-tag text-2xl mb-2"
                          style={{ fontFamily: headerFont }}
                        >
                          {caption.title}
                        </h3>
                        <p className="font-street text-sm mb-1">{caption.description}</p>
                        {caption.location && (
                          <p className="font-street text-sm location">📍 {caption.location}</p>
                        )}
                        {caption.date && (
                          <p className="font-street text-sm date">{caption.getFormattedDate()}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Art;
