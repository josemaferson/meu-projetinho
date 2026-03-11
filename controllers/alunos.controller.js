const db = require('../database/database');

// LISTAR TODOS OS ALUNOS
exports.listarAlunos = (req, res) => {
  db.query("SELECT * FROM alunos", (err, results) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.json(results);
  });
};

// BUSCAR ALUNO POR ID
exports.buscarAluno = (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM alunos WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensagem: "Aluno não encontrado" });
    }

    res.json(results[0]);
  });
};

// CRIAR ALUNO
exports.criarAluno = (req, res) => {
  const { nome, idade, curso } = req.body;

  db.query(
    "INSERT INTO alunos (nome, idade, curso) VALUES (?, ?, ?)",
    [nome, idade, curso],
    (err, result) => {
      if (err) {
        return res.status(500).json({ erro: err.message });
      }

      res.status(201).json({
        mensagem: "Aluno cadastrado com sucesso!",
        id: result.insertId
      });
    }
  );
};

// ATUALIZAR ALUNO
exports.atualizarAluno = (req, res) => {
  const id = req.params.id;
  const { nome, idade, curso } = req.body;

  db.query(
    "UPDATE alunos SET nome = ?, idade = ?, curso = ? WHERE id = ?",
    [nome, idade, curso, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ erro: err.message });
      }

      if (result.affectedRows === 0) {
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
    "DELETE FROM alunos WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ erro: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ mensagem: "Aluno não encontrado" });
      }

      res.json({ mensagem: "Aluno deletado com sucesso!" });
    }
  );
};