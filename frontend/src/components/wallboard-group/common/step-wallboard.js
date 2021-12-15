import React from 'react';
const StepWallboard = ({ wallboardFulData, ...props }) => {
  return (
    <div className="step__wallboard">
      {wallboardFulData?.imageBase64 ? (
        <img src={wallboardFulData.imageBase64} className="step__wallboard-preview" alt="Wallboard" />
      ) : (
        <>
          <div className="step__wallboard-header" />
          <div className="step__wallboard-toolbar">
            <div className="step__wallboard-toolbar-left" />
            <div className="step__wallboard-toolbar-right">
              <div className="step__wallboard-toolbar-cube"></div>
              <div className="step__wallboard-toolbar-circle"></div>
            </div>
          </div>
          <div className="step__wallboard-info" />
          <div className="step__wallboard-cards">
            {[...new Array(6)].map((_, index) => (
              <div key={index} className="step__wallboard-card" />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StepWallboard;
