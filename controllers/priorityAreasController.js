const db = require('../app').db;

function listPriorityAreas(callback) {
  db.all('SELECT * FROM priority_areas', [], callback);
}

function createPriorityArea({ name, description, user_id, relevance }, callback) {
  db.run(
    'INSERT INTO priority_areas (name, description, user_id, relevance) VALUES (?, ?, ?, ?)',
    [name, description, user_id || null, relevance || 1],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    }
  );
}

function updatePriorityArea(id, { name, description, relevance }, callback) {
  db.run(
    'UPDATE priority_areas SET name = ?, description = ?, relevance = ? WHERE id = ?',
    [name, description, relevance, id],
    function (err) {
      if (err) return callback(err);
      callback(null, { updated: this.changes });
    }
  );
}

function deletePriorityArea(id, callback) {
  db.run(
    'DELETE FROM priority_areas WHERE id = ?',
    [id],
    function (err) {
      if (err) return callback(err);
      callback(null, { deleted: this.changes });
    }
  );
}

module.exports = {
  listPriorityAreas,
  createPriorityArea,
  updatePriorityArea,
  deletePriorityArea
};