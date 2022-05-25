import React from 'react';


import './Passo.css'

const Passo = (passo) => {
    console.log(passo)
    return (
        <div className='passo-container'>
            <div className='passo-id-container'><div className='passo-id'><span>{passo.id}</span></div></div>
            <div className='passo'> {passo.passo}</div>
            <img src={passo.imagem} />
        </div>
      );
}
 
export default Passo;