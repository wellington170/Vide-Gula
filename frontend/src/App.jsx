import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar'
import GestaoProdutos from './pages/GestaoProduto/GestaoProdutos'
import Dashboard from './pages/Dashboard/Dashboard'
import GestaoPedidos from './pages/GestaoPedidos/GestaoPedidos'
import Carrinho from './pages/Carrinho/Carrinho'
import AcompanharPedido from './pages/AcompanharPedido/AcompanharPedido'


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<GestaoProdutos />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pedidos" element={<GestaoPedidos />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/acompanhar-pedido" element={<AcompanharPedido />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
