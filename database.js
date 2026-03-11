const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // padrão do XAMPP/Wamp (se tiver senha, coloque aqui)
  database: 'escola' // MUDADO: agora aponta para o banco de alunos
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL (Banco: escola) com sucesso!');
  }
});

module.exports = db;