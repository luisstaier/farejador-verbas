const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Novo conteúdo: importar rotas de usuários
const usersRouter = require('./routes/users');

// Novo conteúdo: importar rotas de dashboard
const dashboardRouter = require('./routes/dashboard');

// Novo conteúdo: importar rotas de aplicações
const applicationsRouter = require('./routes/applications');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Criar diretório data se necessário
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('Diretório criado:', dataDir);
}

// Conexão robusta com SQLite
const dbPath = path.join(dataDir, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro SQLite:', err.message);
    process.exit(1);
  }
  console.log('SQLite conectado:', dbPath);
});

// Novo conteúdo: importar inicialização do schema
const dbInit = require('./models/schema');

// Após a conexão com SQLite, inicializar o schema
dbInit(db);

// Novo conteúdo: importar rotas de prioridade de áreas
const priorityAreasRouter = require('./routes/priorityAreas');

// Registrar rota para prioridade de áreas
app.use('/priority-areas', priorityAreasRouter);

// Novo conteúdo: importar rotas de fontes de financiamento
const fundingSourcesRouter = require('./routes/fundingSources');

// Registrar rota para fontes de financiamento
app.use('/funding-sources', fundingSourcesRouter);

// Novo conteúdo: importar rotas de oportunidades
const opportunitiesRouter = require('./routes/opportunities');

// Registrar rota para oportunidades
app.use('/opportunities', opportunitiesRouter);

// Novo conteúdo: importar rotas de usuários
app.use('/users', usersRouter);

// Novo conteúdo: registrar rota para dashboard
app.use('/dashboard', dashboardRouter);

// Novo conteúdo: registrar rota para aplicações
app.use('/applications', applicationsRouter);

// Exemplo de rota inicial
app.get('/', (req, res) => {
  res.send('Farejador de Verbas para Prefeituras - Backend iniciado!');
});

// Inicializar servidor
app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});

module.exports = { app, db };