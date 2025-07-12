const express = require('express');
const router = express.Router();

// Adicione no topo:
const dashboardController = require('../controllers/dashboardController');

// Dashboard principal
router.get('/', (req, res) => {
  const { area, status, minValue, maxValue, deadline } = req.query;

  // Se algum filtro está presente, usa filtro dinâmico
  if (area || status || minValue || maxValue || deadline) {
    const filterParams = { area, status, minValue, maxValue, deadline };
    dashboardController.filterOpportunities(filterParams, (err, deadlines) => {
      if (err) return res.status(500).send('Erro ao filtrar editais');
      dashboardController.getSummaryByArea((err2, summary) => {
        if (err2) return res.status(500).send('Erro no resumo das áreas');
        dashboardController.getCaptureHistory((err3, history) => {
          if (err3) return res.status(500).send('Erro no histórico');
          res.render('dashboard', { summary, deadlines, history });
        });
      });
    });
  } else {
    // Fluxo padrão (sem filtro)
    dashboardController.getSummaryByArea((err, summary) => {
      if (err) return res.status(500).send('Erro no resumo das áreas');
      dashboardController.getDeadlinesAndStatus((err2, deadlines) => {
        if (err2) return res.status(500).send('Erro nos prazos/status');
        dashboardController.getCaptureHistory((err3, history) => {
          if (err3) return res.status(500).send('Erro no histórico');
          res.render('dashboard', { summary, deadlines, history });
        });
      });
    });
  }
});

module.exports = router;