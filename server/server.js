const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve os arquivos da pasta "client"
app.use(express.static(path.join(__dirname, "../client")));

// Rotas da API
app.post("/guardar-nome", (req, res) => { /* ... */ });
app.post("/verificar-resposta", (req, res) => { /* ... */ });
app.get("/pegar-nome", (req, res) => { /* ... */ });

// Fallback para index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
