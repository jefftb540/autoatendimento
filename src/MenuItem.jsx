import React from 'react';

import './MenuItem.css'

const MenuItem = (item) => {
    return ( 
        <div className='menu-item-container'>
            <div className='menu-item-id-container'><div className='menu-item-id'><span>{item.item.id}</span></div></div>
            <div className='menu-item-titulo'>{item.item.titulo}</div>
        </div>
     );
}
 
export default MenuItem;