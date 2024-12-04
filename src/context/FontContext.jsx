import { createContext, useContext, useState } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontStyle, setFontStyle] = useState('Default');

  const toggleFontStyle = (style) => {
    setFontStyle(style);
    document.body.className = style === 'EasyRead' ? 'easy-read' : '';
  };

  return (
    <FontContext.Provider value={{ fontStyle, toggleFontStyle }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};
