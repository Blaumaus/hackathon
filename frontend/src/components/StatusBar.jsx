import React from 'react';
import cx from 'clsx'

const StatusBar = ({ name, percentage }) => {
  let colorClass;
  if (percentage <= 30) {
    colorClass = 'bg-red-500'; 
  } else if (percentage <= 65) {
    colorClass = 'bg-yellow-500'; 
  } else {
    colorClass = 'bg-green-500'; 
  }

  const progressWidth = `${percentage}%`;

  return (
    <div className="flex justify-center items-center space-x-4">
      <div className="text-lg">{name}</div>
      <div className='border border-black w-24 h-6 rounded-full relative overflow-hidden bg-white'>
        <div style={{ width: progressWidth }} className={cx("h-full", colorClass)}></div>
      </div>
    </div>
  );
};

export default StatusBar;