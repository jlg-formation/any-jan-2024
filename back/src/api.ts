import express from "express";
import crypto from "crypto";

let articles = [
  { id: "a1", name: "Tournevis", price: 2.99, qty: 123 },
  { id: "a2", name: "Pelle", price: 5.5, qty: 23 },
];

const app = express.Router();

app.get("/articles", (req, res) => {
  res.json(articles);
});

app.post("/articles", express.json(), (req, res) => {
  const newArticle = req.body;
  const article = { ...newArticle, id: crypto.randomUUID() };
  articles.push(article);
  res.status(201).end();
});

app.delete("/articles", express.json(), (req, res) => {
  const ids: string[] = req.body;
  articles = articles.filter((a) => !ids.includes(a.id));
  res.status(204).end();
});

export default app;
