const express = require('express');
const router = express.Router();
const controller = require('../controllers/opportunitiesController');

// Listar todas as oportunidades/editais
router.get('/', (req, res) => {
  controller.listOpportunities((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Criar nova oportunidade/edital
router.post('/', (req, res) => {
  controller.createOpportunity(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(result);
  });
});

// Atualizar oportunidade/edital
router.put('/:id', (req, res) => {
  controller.updateOpportunity(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Remover oportunidade/edital
router.delete('/:id', (req, res) => {
  controller.deleteOpportunity(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

module.exports = router;