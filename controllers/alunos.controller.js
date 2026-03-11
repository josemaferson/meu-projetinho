const db = require('../database/database');

// LISTAR TODOS OS ALUNOS
exports.listarAlunos = (req, res) => {
  db.query("SELECT * FROM alunos", (err, result) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.json(result.rows);
  });
};

// BUSCAR ALUNO POR ID
exports.buscarAluno = (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM alunos WHERE id = $1", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: "Aluno não encontrado" });
    }

    res.json(result.rows[0]);
  });
};

// CRIAR ALUNO
exports.criarAluno = (req, res) => {
  const { nome, idade, curso } = req.body;

  db.query(
    "INSERT INTO alunos (nome, idade, curso) VALUES ($1, $2, $3) RETURNING id",
    [nome, idade, curso],
    (err, result) => {
      if (err) {
        return res.status(500).json({ erro: err.message });
      }

      res.status(201).json({
        mensagem: "Aluno cadastrado com sucesso!",
        id: result.rows[0].id
      });
    }
  );
};

// ATUALIZAR ALUNO
exports.atualizarAluno = (req, res) => {
  const id = req.params.id;
  const { nome, idade, curso } = req.body;

  db.query(
    "UPDATE alunos SET nome = $1, idade = $2, curso = $3 WHERE id = $4",
    [nome, idade, curso, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ erro: err.message });
      }

      if (result.rowCount === 0) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" });
      }

      res.json({ mensagem: "Aluno atualizado com sucesso!" });
    }
  );
};

// DELETAR ALUNO
exports.deletarAluno = (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM alunos WHERE id = $1",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ erro: err.message });
      }

      if (result.rowCount === 0) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" });
      }

      res.json({ mensagem: "Aluno deletado com sucesso!" });
    }
  );
};