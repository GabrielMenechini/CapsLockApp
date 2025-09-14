const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// cliente cria pedido
router.post("/", orderController.create);

// admin consulta pedidos
router.get("/", orderController.list);

module.exports = router;
