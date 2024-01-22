const express = require("express");

const app = express.Router();
module.exports = app;

app.get("/articles", (req, res) => {
  res.json([
    { id: "a1", name: "Tournevis", price: 2.99, qty: 123 },
    { id: "a2", name: "Pelle", price: 5.5, qty: 23 },
  ]);
});
