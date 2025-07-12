const express = require('express');
const router = express.Router();
const db = require('../app').db;

// Listar todos os usuários/prefeituras
router.get('/', (req, res) => {
  db.all('SELECT id, name, email, role, preferences FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Criar novo usuário/prefeitura
router.post('/', (req, res) => {
  const { name, email, password, role, preferences } = req.body;
  db.run(
    'INSERT INTO users (name, email, password, role, preferences) VALUES (?, ?, ?, ?, ?)',
    [name, email, password, role || 'admin', preferences || null],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Atualizar usuário/prefeitura
router.put('/:id', (req, res) => {
  const { name, email, password, role, preferences } = req.body;
  const { id } = req.params;
  db.run(
    'UPDATE users SET name = ?, email = ?, password = ?, role = ?, preferences = ? WHERE id = ?',
    [name, email, password, role, preferences, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// Remover usuário/prefeitura
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;