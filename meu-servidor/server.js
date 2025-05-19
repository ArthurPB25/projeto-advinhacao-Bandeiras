// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let jogadores = {};

app.post('/verificar-resposta', (req, res) => {
  const { resposta, correta } = req.body;
  if (!resposta || !correta) return res.status(400).json({ error: 'Faltando dados' });

  const resultado = resposta.toLowerCase().trim() === correta.toLowerCase().trim() ? 'Certo' : 'Errado';
  res.json({ resultado });
});

app.post('/guardar-nome', (req, res) => {
  const { nome, ponto, tempo } = req.body;
  if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });

  if (!jogadores[nome]) {
    jogadores[nome] = { nome, ponto: 50, tempo: "00:00" };
  }
  if (ponto === 0) {
    jogadores[nome].ponto = 50;
    jogadores[nome].tempo = "00:00";
  } else if (ponto) {
    jogadores[nome].ponto += ponto;
  }
  if (tempo) {
    jogadores[nome].tempo = tempo;
  }

  res.json(jogadores);
});

app.get('/pegar-nome', (req, res) => {
  res.json(jogadores);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});