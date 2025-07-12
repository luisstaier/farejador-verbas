const express = require('express');
const router = express.Router();
const controller = require('../controllers/fundingSourcesController');

// Listar todas as fontes de verba
router.get('/', (req, res) => {
  controller.listFundingSources((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Criar nova fonte de verba
router.post('/', (req, res) => {
  controller.createFundingSource(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(result);
  });
});

// Atualizar fonte de verba
router.put('/:id', (req, res) => {
  controller.updateFundingSource(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Remover fonte de verba
router.delete('/:id', (req, res) => {
  controller.deleteFundingSource(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

module.exports = router;