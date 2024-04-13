import React from 'react';

export const GradientButton = ({ children, className, ...props }) => {
  return (
    <button
      className={`inline-block px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};