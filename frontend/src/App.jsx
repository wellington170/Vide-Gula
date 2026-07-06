import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar'
import GestaoProdutos from './pages/GestaoProduto/GestaoProdutos'
import Dashboard from './pages/Dashboard/Dashboard'
import GestaoPedidos from './pages/GestaoPedidos/GestaoPedidos'


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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
