import React from 'react';
import PropTypes from 'prop-types';

import Category from '../category/category';
import './Menu.css';

function Menu({ categories }) {
  return (
    <div className="menu-container">
      <div className="menu">
        {categories.map((category, index) => {
          // eslint-disable-next-line no-param-reassign
          category.index = index + 1;
          return (
            <Category
              key={category.id}
              category={category}

            />
          );
        })}
      </div>
      <div className="lateral">
        <div className="aviso">
          <h2>
            APERTE, NO TECLADO NUMÉRICO AO LADO,
            O NÚMERO CORRESPONDENTE A OPÇÃO QUE NECESSITAR INFORMAÇÕES
          </h2>
          <div className="imagem"><img src="/seta.png" alt="Seta apontando para a direita" /></div>
        </div>
        <div className="logo">
          <img src="/logo.png" alt="logotipo do IFRN" />
        </div>
      </div>
    </div>
  );
}

Menu.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Menu;
