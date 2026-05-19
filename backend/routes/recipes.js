const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      nome: "Bolo de Cenoura",
      categoria: "Sobremesa",
      tempo: "50 min"
    }
  ]);
});

module.exports = router;