import React from 'react';
import PropTypes from 'prop-types';
import Step from '../step/step';

function StepList({ tutorial, pageNumber, stepsForPage }) {
  return (
    <div>
      {tutorial.map((step, index) => (

        <Step
          key={step.id}
          id={1 + index + ((pageNumber - 1) * stepsForPage)}
          step={step.step}
          image={step.image}
        />
      ))}
    </div>
  );
}

StepList.propTypes = {
  tutorial: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  pageNumber: PropTypes.number.isRequired,
  stepsForPage: PropTypes.number.isRequired,
};
export default StepList;
