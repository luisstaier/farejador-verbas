const db = require('../app').db;

function listUsers(callback) {
  db.all('SELECT id, name, email, role, preferences FROM users', [], callback);
}

function createUser({ name, email, password, role, preferences }, callback) {
  db.run(
    'INSERT INTO users (name, email, password, role, preferences) VALUES (?, ?, ?, ?, ?)',
    [name, email, password, role || 'admin', preferences || null],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    }
  );
}

function updateUser(id, { name, email, password, role, preferences }, callback) {
  db.run(
    'UPDATE users SET name = ?, email = ?, password = ?, role = ?, preferences = ? WHERE id = ?',
    [name, email, password, role, preferences, id],
    function (err) {
      if (err) return callback(err);
      callback(null, { updated: this.changes });
    }
  );
}

function deleteUser(id, callback) {
  db.run(
    'DELETE FROM users WHERE id = ?',
    [id],
    function (err) {
      if (err) return callback(err);
      callback(null, { deleted: this.changes });
    }
  );
}

module.exports = {
  listUsers,
  createUser,
  updateUser,
  deleteUser
};