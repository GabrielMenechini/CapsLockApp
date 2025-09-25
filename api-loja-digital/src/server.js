import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import productsRouter from '../src/routes/produtoRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use('/images', express.static(path.resolve('public/images')));

app.get('/', (req, res) => {
  res.json({ success: true, message: 'API CapsLock OK' });
});

app.use('/products', productsRouter);

// Middleware 404 para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`✅ API rodando em http://localhost:${PORT}`);
});
