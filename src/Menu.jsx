import React from 'react';

import MenuItem from './MenuItem';
import './Menu.css';

const Menu = ({itens}) => {
    return (
        <div className='menu-container'>
            <div className='menu'>
                {itens.map((item) => (
                    <MenuItem
                        key={item.id}
                        item = {item}
                    />
                ))}
            </div>
            <div className='lateral'>
                <div className='aviso'>
                    APERTE, NO TECLADO NUMÉRICO AO LADO, O NÚMERO CORRESPONDENTE A OPÇÃO QUE NECESSITAR INFORMAÇÕES
                    <div className='imagem'><img src='/seta.png' /></div>
                </div>
                <div className='logo'>
                    <img src='/logo.png' />
                </div>
            </div>
        </div>
    );
};
 
export default Menu;