import React from 'react';

import './category.css';
import PropTypes from 'prop-types';

function Category({ category }) {
  const { name, index } = category;

  return (
    <div className="category-container">
      <div className="category-id-container">
        <div className="category-id">
          <span>{index}</span>
        </div>
      </div>
      <div className="category-name">{name}</div>
    </div>
  );
}
Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
};
export default Category;
