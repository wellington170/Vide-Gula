import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';
import { logoutAction } from '../redux/slices/authSlice';
import authService from '../services/authService';

const Navbar = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const cartItens = useSelector((state) => state.cart.itens);

  const handleLogout = () => {
    authService.logout();
    dispatch(logoutAction());
    setMenuAberto(false);
    navigate('/login');
  };

  return (
    <header className="top-navbar">
      <div className="logo-area">
        <img src={logo} alt="Vide Gula Logo" className='logo-nav'/>
      </div>
      
      <nav className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link ativo" : "nav-link"}>
          <span className="icon-placeholder">🏠</span> Home
        </NavLink>
        {user?.perfil === 'ADMINISTRADOR' && (
          <NavLink to="/produtos" className={({ isActive }) => isActive ? "nav-link ativo" : "nav-link"}>
            <span className="icon-placeholder">🛒</span> Produtos
          </NavLink>
        )}
        {user?.perfil === 'ADMINISTRADOR' && (
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link ativo" : "nav-link"}>
            <span className="icon-placeholder">📊</span> Dashboard
          </NavLink>
        )}
        {user?.perfil === 'ADMINISTRADOR' && (
        <NavLink to="/pedidos" className={({ isActive }) => isActive ? "nav-link ativo" : "nav-link"}>
          <span className="icon-placeholder">📋</span> Pedidos
        </NavLink>
        )}
        <NavLink to="/carrinho" className={({ isActive }) => isActive ? "nav-link ativo" : "nav-link"}>
          <span className="icon-placeholder">🛵</span> Carrinho {cartItens.length > 0 && `(${cartItens.length})`}
        </NavLink>
        <NavLink to="/acompanhar-pedido" className={({ isActive }) => isActive ? "nav-link ativo" : "nav-link"}>
          <span className="icon-placeholder">🛵</span> Acompanhar Pedidos
        </NavLink>
      </nav>
      
      <div className="user-profile">
        <div style={{ position: 'relative' }}>
          <button 
            className="icon-placeholder user-icon"
            onClick={() => setMenuAberto(!menuAberto)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px' }}
          >
            👤
          </button>
          {menuAberto && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '40px',
              background: 'white',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
              minWidth: '200px',
            }}>
              {user && (
                <>
                  <div style={{ padding: '10px 15px', borderBottom: '1px solid #eee' }}>
                    <p style={{ margin: 0, fontWeight: '600' }}>{user.nome}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      border: 'none',
                      background: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: '#5c1c1c',
                      fontWeight: '600',
                    }}
                  >
                    Sair
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;