import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar'
import GestaoProdutos from './pages/GestaoProduto/GestaoProdutos'
import Dashboard from './pages/Dashboard/Dashboard'
import GestaoPedidos from './pages/GestaoPedidos/GestaoPedidos'
import Carrinho from './pages/Carrinho/Carrinho'
import AcompanharPedido from './pages/AcompanharPedido/AcompanharPedido'

// Componente de rota protegida
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  return isAuthenticated ? element : <Navigate to="/login" replace />
}

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <>
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/produtos" element={<ProtectedRoute element={<GestaoProdutos />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/pedidos" element={<ProtectedRoute element={<GestaoPedidos />} />} />
          <Route path="/carrinho" element={<ProtectedRoute element={<Carrinho />} />} />
          <Route path="/acompanhar-pedido" element={<ProtectedRoute element={<AcompanharPedido />} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
