const dbInit = (db) => {
  // Tabela de usuários/prefeituras
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'admin', -- admin, gestor, colaborador
      preferences TEXT -- JSON de preferências (áreas, notificações, etc)
    )
  `);

  // Tabela de áreas prioritárias
  db.run(`
    CREATE TABLE IF NOT EXISTS priority_areas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      user_id INTEGER,
      relevance INTEGER DEFAULT 1, -- peso de prioridade (1-5)
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  // Tabela de fontes de verba
  db.run(`
    CREATE TABLE IF NOT EXISTS funding_sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      type TEXT, -- oficial, privada, internacional
      url TEXT,
      status TEXT DEFAULT 'active'
    )
  `);

  // Tabela de oportunidades/editais
  db.run(`
    CREATE TABLE IF NOT EXISTS opportunities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      area_id INTEGER,
      source_id INTEGER,
      value REAL,
      deadline TEXT,
      complexity TEXT, -- baixo, médio, alto
      url TEXT,
      status TEXT DEFAULT 'novo', -- novo, em análise, enviado, aprovado, reprovado
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT,
      FOREIGN KEY(area_id) REFERENCES priority_areas(id),
      FOREIGN KEY(source_id) REFERENCES funding_sources(id)
    )
  `);

  // Tabela de candidaturas (histórico)
  db.run(`
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      opportunity_id INTEGER,
      user_id INTEGER,
      status TEXT, -- enviada, aprovada, reprovada, em análise
      notes TEXT,
      documents TEXT, -- JSON com caminhos dos arquivos
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY(opportunity_id) REFERENCES opportunities(id),
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  // Tabela de alertas enviados
  db.run(`
    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      opportunity_id INTEGER,
      user_id INTEGER,
      channel TEXT, -- email, telegram, whatsapp
      sent_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY(opportunity_id) REFERENCES opportunities(id),
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
};

module.exports = dbInit;