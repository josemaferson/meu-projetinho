const express = require('express');
const path = require('path');
const cors = require('cors'); // Adicionei isso para evitar outros erros
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// O ERRO ESTAVA AQUI: Mude de 'eventos.routes' para 'alunos.routes'
const alunosRoutes = require('./routes/alunos.routes'); 

app.use('/api', alunosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});