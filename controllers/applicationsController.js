const db = require('../app').db;

function listApplications(callback) {
  db.all(`
    SELECT app.*, u.name as user_name, o.title as opportunity_title
    FROM applications app
    LEFT JOIN users u ON app.user_id = u.id
    LEFT JOIN opportunities o ON app.opportunity_id = o.id
    ORDER BY app.updated_at DESC
  `, [], callback);
}

function createApplication({ opportunity_id, user_id, status, notes, documents }, callback) {
  db.run(
    `INSERT INTO applications (opportunity_id, user_id, status, notes, documents) VALUES (?, ?, ?, ?, ?)`,
    [opportunity_id, user_id, status, notes, documents || null],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    }
  );
}

function updateApplication(id, { status, notes, documents }, callback) {
  db.run(
    `UPDATE applications SET status = ?, notes = ?, documents = ?, updated_at = datetime('now') WHERE id = ?`,
    [status, notes, documents, id],
    function (err) {
      if (err) return callback(err);
      callback(null, { updated: this.changes });
    }
  );
}

function deleteApplication(id, callback) {
  db.run(
    'DELETE FROM applications WHERE id = ?',
    [id],
    function (err) {
      if (err) return callback(err);
      callback(null, { deleted: this.changes });
    }
  );
}

module.exports = {
  listApplications,
  createApplication,
  updateApplication,
  deleteApplication
};