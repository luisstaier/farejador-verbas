const express = require('express');
const router = express.Router();
const controller = require('../controllers/applicationsController');

// Listar todas as candidaturas (applications)
router.get('/', (req, res) => {
  controller.listApplications((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Criar nova candidatura
router.post('/', (req, res) => {
  controller.createApplication(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(result);
  });
});

// Atualizar candidatura
router.put('/:id', (req, res) => {
  controller.updateApplication(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Remover candidatura
router.delete('/:id', (req, res) => {
  controller.deleteApplication(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

module.exports = router;