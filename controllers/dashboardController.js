const db = require('../app').db;

// Busca resumo financeiro por área prioritária
function getSummaryByArea(callback) {
  const sql = `
    SELECT a.name as area, SUM(o.value) as total_disponivel,
           SUM(CASE WHEN o.status = 'aprovado' THEN o.value ELSE 0 END) as total_captado
      FROM opportunities o
      LEFT JOIN priority_areas a ON o.area_id = a.id
    GROUP BY a.id
  `;
  db.all(sql, [], callback);
}

// Lista editais com prazo e status
function getDeadlinesAndStatus(callback) {
  const sql = `
    SELECT o.id, o.title, o.deadline, o.status, a.name as area
      FROM opportunities o
      LEFT JOIN priority_areas a ON o.area_id = a.id
    ORDER BY o.deadline ASC
  `;
  db.all(sql, [], callback);
}

// Busca histórico de captação (quantidade e valor por mês)
function getCaptureHistory(callback) {
  const sql = `
    SELECT strftime('%Y-%m', o.created_at) as mes,
           SUM(CASE WHEN o.status = 'aprovado' THEN o.value ELSE 0 END) as captado,
           COUNT(CASE WHEN o.status = 'aprovado' THEN 1 END) as qtd
      FROM opportunities o
    GROUP BY mes
    ORDER BY mes
  `;
  db.all(sql, [], callback);
}

// Filtros dinâmicos para oportunidades
function filterOpportunities({ area, status, minValue, maxValue, deadline }, callback) {
  let filters = [];
  let params = [];

  if (area) {
    filters.push('a.name LIKE ?');
    params.push(`%${area}%`);
  }
  if (status) {
    filters.push('o.status = ?');
    params.push(status);
  }
  if (minValue) {
    filters.push('o.value >= ?');
    params.push(minValue);
  }
  if (maxValue) {
    filters.push('o.value <= ?');
    params.push(maxValue);
  }
  if (deadline) {
    filters.push('o.deadline <= ?');
    params.push(deadline);
  }

  let sql = `
    SELECT o.*, a.name as area
    FROM opportunities o
    LEFT JOIN priority_areas a ON o.area_id = a.id
    ${filters.length ? 'WHERE ' + filters.join(' AND ') : ''}
    ORDER BY o.deadline ASC
  `;
  db.all(sql, params, callback);
}

module.exports = {
  getSummaryByArea,
  getDeadlinesAndStatus,
  getCaptureHistory,
  filterOpportunities
};