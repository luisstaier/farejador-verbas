const express = require('express');
const router = express.Router();
const controller = require('../controllers/priorityAreasController');

// Listar todas as áreas prioritárias
router.get('/', (req, res) => {
  controller.listPriorityAreas((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Criar nova área prioritária
router.post('/', (req, res) => {
  controller.createPriorityArea(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(result);
  });
});

// Atualizar área prioritária
router.put('/:id', (req, res) => {
  controller.updatePriorityArea(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Remover área prioritária
router.delete('/:id', (req, res) => {
  controller.deletePriorityArea(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

module.exports = router;