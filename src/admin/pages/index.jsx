import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import './index.css';

export default function Admin() {
  const user = useSelector((state) => state.auth.user);
  const [showLogout, setShowLogout] = useState(false);
  function toogleLogout() {
    setShowLogout(!showLogout);
  }
  return (
    <div className="admin">
      <div className="header">
        <div className="ifrn">IFRN</div>
        <div className="user-menu">
          <div className="username"><button type="button" onClick={toogleLogout}>{user.name}</button></div>
          <div className={showLogout ? 'dropdown logout ' : ' hidden'}>Sair</div>
        </div>
      </div>
      <div className="admin-container">
        <nav className="nav">
          <ul className="menu">
            <Link to="categories"><li>Categorias</li></Link>
            <Link to="tutorials"><li>Tutoriais</li></Link>
            <Link to="users"><li>Usuários</li></Link>

          </ul>
        </nav>
        <Outlet />
      </div>

    </div>
  );
}
