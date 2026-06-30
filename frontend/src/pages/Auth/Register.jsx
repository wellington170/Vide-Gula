import React from 'react';
import './Auth.css';
import logo from '../../images/logo.png';

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <h1 className="auth-title">Criar nova conta</h1>
        <p className="auth-subtitle">Crie sua conta para fazer seus pedidos</p>

        <form className="auth-form">
          <div className="input-group">
            <label htmlFor="nome">Nome</label>
            <input type="text" placeholder="Digite seu nome" />
          </div>

          <div className="input-group">
            <label htmlFor="telefone">Telefone</label>
            <input type="tel" placeholder="Digite seu telefone" />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Digite seu e-mail" />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input type="password" placeholder="Digite sua senha" />
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <button type="submit" className="btn-primary">Criar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;