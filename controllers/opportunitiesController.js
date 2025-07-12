const db = require('../app').db;

function listOpportunities(callback) {
  db.all('SELECT * FROM opportunities', [], callback);
}

function createOpportunity({ title, description, area_id, source_id, value, deadline, complexity, url, status }, callback) {
  db.run(
    `INSERT INTO opportunities 
      (title, description, area_id, source_id, value, deadline, complexity, url, status) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, description, area_id, source_id, value, deadline, complexity, url, status || 'novo'],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    }
  );
}

function updateOpportunity(id, { title, description, area_id, source_id, value, deadline, complexity, url, status }, callback) {
  db.run(
    `UPDATE opportunities SET 
      title = ?, description = ?, area_id = ?, source_id = ?, value = ?, deadline = ?, 
      complexity = ?, url = ?, status = ?, updated_at = datetime('now') 
     WHERE id = ?`,
    [title, description, area_id, source_id, value, deadline, complexity, url, status, id],
    function (err) {
      if (err) return callback(err);
      callback(null, { updated: this.changes });
    }
  );
}

function deleteOpportunity(id, callback) {
  db.run(
    'DELETE FROM opportunities WHERE id = ?',
    [id],
    function (err) {
      if (err) return callback(err);
      callback(null, { deleted: this.changes });
    }
  );
}

module.exports = {
  listOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
};