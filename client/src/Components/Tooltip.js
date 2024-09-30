// src/Components/Tooltip.js
import React from 'react';

const Tooltip = ({ message, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-no-wrap">
        {message}
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-2 h-2 bg-black rotate-45"></div>
      </div>
    </div>
  );
};

export default Tooltip;
