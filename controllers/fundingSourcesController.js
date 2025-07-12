const db = require('../app').db;

function listFundingSources(callback) {
  db.all('SELECT * FROM funding_sources', [], callback);
}

function createFundingSource({ name, description, type, url, status }, callback) {
  db.run(
    'INSERT INTO funding_sources (name, description, type, url, status) VALUES (?, ?, ?, ?, ?)',
    [name, description, type, url, status || 'active'],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    }
  );
}

function updateFundingSource(id, { name, description, type, url, status }, callback) {
  db.run(
    'UPDATE funding_sources SET name = ?, description = ?, type = ?, url = ?, status = ? WHERE id = ?',
    [name, description, type, url, status, id],
    function (err) {
      if (err) return callback(err);
      callback(null, { updated: this.changes });
    }
  );
}

function deleteFundingSource(id, callback) {
  db.run(
    'DELETE FROM funding_sources WHERE id = ?',
    [id],
    function (err) {
      if (err) return callback(err);
      callback(null, { deleted: this.changes });
    }
  );
}

module.exports = {
  listFundingSources,
  createFundingSource,
  updateFundingSource,
  deleteFundingSource
};