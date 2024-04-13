import React from 'react';

const StatusBar = ({ name, color, percentage }) => {
  let colorClass;
  if (percentage <= 30) {
    colorClass = 'bg-red-500'; 
  } else if (percentage <= 75) {
    colorClass = 'bg-yellow-500'; 
  } else {
    colorClass = 'bg-green-500'; 
  }

  return (
    <div className="flex justify-center space-x-4">
      <div className="text-lg">{name}</div>
      <div className={`w-20 h-6 ${colorClass}`}></div>
      <div className="text-lg">{percentage}%</div>
    </div>
  );
};

export default StatusBar;
