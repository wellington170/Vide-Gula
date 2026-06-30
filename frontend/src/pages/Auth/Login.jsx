import React from 'react';
import { Link } from 'react-router-dom';

import './Auth.css';
import logo from '../../images/logo.png';

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <h1 className="auth-title">Seja bem vindo!</h1>
        <p className="auth-subtitle">Faça login para fazer seus pedidos</p>

        <form className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Digite seu e-mail" />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input type="password" placeholder="Digite sua senha" />
          </div>

          <div className="auth-links">
            <Link to="/register" className="link-criar-conta">Criar conta</Link>
          </div>

          <button type="submit" className="btn-primary">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;