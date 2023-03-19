import React from 'react';

import './step.css';

function Step(pace) {
  const { id, step, image } = pace;
  return (
    <div className="step-container">
      <div className="step-text-container">
        <div className="step-id-container">
          <div className="step-id">
            <span>{id}</span>
          </div>
        </div>
        <div className="step">
          {' '}
          {step}
        </div>
      </div>
      {image ? (
        <div className="image-container">
          <img src={image} alt={step} />

        </div>
      ) : ''}
    </div>
  );
}

export default Step;
