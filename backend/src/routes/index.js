const express = require('express');
const authRoutes = require('./authRoutes');
const clienteRoutes = require('./clienteRoutes');
const produtoRoutes = require('./produtoRoutes');
const pedidoRoutes = require('./pedidoRoutes');
const adminRoutes = require('./adminRoutes');

const router = express.Router();

router.get("/health", (req, res) => {res.send("O server esta online");}); 

router.use(authRoutes);
router.use(clienteRoutes);
router.use(produtoRoutes);
router.use(pedidoRoutes);
router.use(adminRoutes);

router.use((req, res) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada.' });
});

module.exports = router;
