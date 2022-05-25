import React from 'react';
import Passo from './Passo';

const Passos = ({tutorial}) => {
    console.log(tutorial)
    return ( 
        <div>
            {tutorial.map((passo) => (
                //console.log(passo)
                <Passo
                    key={passo.id}
                    id={passo.id}
                    passo = {passo.passo}
                    imagem = {passo.imagem}
                />
            ))}
        </div>
    );
}
 
export default Passos;