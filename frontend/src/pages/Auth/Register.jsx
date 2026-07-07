import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import logo from '../../images/logo.png';
import authService from '../../services/authService';
import { registerSuccess, registerFailure } from '../../redux/slices/authSlice';

const Register = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [complemento, setComplemento] = useState('');
  const [pontoReferencia, setPontoReferencia] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validações básicas
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      const endereco = {
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        complemento: complemento || null,
        pontoReferencia: pontoReferencia || null,
      };

      const response = await authService.register(
        nome,
        email,
        telefone,
        senha,
        confirmarSenha,
        endereco
      );
      dispatch(registerSuccess(response.data));
      navigate('/');
    } catch (err) {
      const errorMessage = err?.message || 'Erro ao criar conta';
      setError(errorMessage);
      dispatch(registerFailure(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <h1 className="auth-title">Criar nova conta</h1>
        <p className="auth-subtitle">Crie sua conta para fazer seus pedidos</p>

        {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nome">Nome</label>
            <input 
              type="text" 
              id="nome"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="telefone">Telefone</label>
            <input 
              type="tel" 
              id="telefone"
              placeholder="Digite seu telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input 
              type="password" 
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input 
              type="password" 
              id="confirmarSenha"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>

          <h3 style={{ marginTop: '25px', marginBottom: '15px', fontSize: '16px', color: '#5c1c1c' }}>
            Endereço de Entrega
          </h3>

          <div className="input-group">
            <label htmlFor="rua">Rua</label>
            <input 
              type="text" 
              id="rua"
              placeholder="Digite o nome da rua"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className="input-group">
              <label htmlFor="numero">Número</label>
              <input 
                type="text" 
                id="numero"
                placeholder="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="cep">CEP</label>
              <input 
                type="text" 
                id="cep"
                placeholder="CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="bairro">Bairro</label>
            <input 
              type="text" 
              id="bairro"
              placeholder="Digite o bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className="input-group">
              <label htmlFor="cidade">Cidade</label>
              <input 
                type="text" 
                id="cidade"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="estado">Estado</label>
              <input 
                type="text" 
                id="estado"
                placeholder="Estado (UF)"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                maxLength="2"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="complemento">Complemento (Opcional)</label>
            <input 
              type="text" 
              id="complemento"
              placeholder="Apto, sala, etc."
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="pontoReferencia">Ponto de Referência (Opcional)</label>
            <input 
              type="text" 
              id="pontoReferencia"
              placeholder="Próximo a..."
              value={pontoReferencia}
              onChange={(e) => setPontoReferencia(e.target.value)}
            />
          </div>
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Criando...' : 'Criar'}
            </button>
            <Link to="/login" style={{ textAlign: 'center', color: '#5c1c1c', textDecoration: 'none' }}>
              Já tem conta? Fazer login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;