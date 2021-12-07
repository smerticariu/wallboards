import React from 'react';

export const ProgressBar = ({ width, ...props }) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar__progress" style={{ width: width + '%' }}></div>
    </div>
  );
};
