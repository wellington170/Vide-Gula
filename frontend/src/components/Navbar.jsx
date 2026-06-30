import React from 'react';


import './Navbar.css';
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="top-navbar">
      <div className="logo-area">
        <img src={logo} alt="Vide Gula Logo" className='logo-nav'/>
      </div>
      
      <nav className="navbar-links">
        <NavLink to="/carrinho" className={({ isActive }) => isActive ? "nav-link ativo" : "nav-link"}>
          <span className="icon-placeholder">[🛒]</span> Produtos
        </NavLink>
        <NavLink to="/pedidos" className={({ isActive }) => isActive ? "nav-link ativo" : "nav-link"}>
          <span className="icon-placeholder">[📋]</span> Pedidos
        </NavLink>
      </nav>
      
      <div className="user-profile">
        <span className="icon-placeholder user-icon">[👤]</span>
      </div>
    </header>
  );
};

export default Navbar;