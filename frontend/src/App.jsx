import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar'
import GestaoProdutos from './pages/GestaoProduto/GestaoProdutos'


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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
