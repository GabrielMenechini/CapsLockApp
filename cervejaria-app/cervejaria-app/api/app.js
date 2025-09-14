require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use((req, res) => res.status(404).json({ error: "Rota não encontrada" }));

app.use((err, _req, res, _next) => {
  console.error("Erro:", err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

const { ensureSeed } = require("./src/utils/seed");
ensureSeed(path.join(__dirname, "src", "data"))
  .then(() => {
    const port = process.env.PORT || 3333;
    app.listen(port, () =>
      console.log(`API rodando em http://localhost:${port}`)
    );
  })
  .catch((e) => {
    console.error("Falha ao iniciar dados:", e);
    process.exit(1);
  });
