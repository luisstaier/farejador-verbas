# Farejador de Verbas para Prefeituras

Sistema automatizado para captação, gestão e monitoramento de oportunidades de recursos para prefeituras, incluindo dashboard, automação via scraping/API e alertas multicanal (e-mail, Telegram, WhatsApp).

## Funcionalidades Principais

- Cadastro e personalização de áreas prioritárias.
- Cadastro e gestão de fontes de verba (oficiais, privadas, internacionais).
- Monitoramento automatizado de editais via scraping/API (exemplo: SICONV).
- Classificação e priorização automática das oportunidades.
- Dashboard dinâmico com resumo financeiro, prazos, status e histórico.
- Filtros e pesquisa avançada no painel de gestão.
- Gerenciamento de candidaturas (progresso, notas, anexos).
- Sistema de alertas automáticos via e-mail, Telegram e WhatsApp.
- Estrutura modular para fácil expansão.

## Tecnologias Utilizadas

- Node.js, Express, EJS
- SQLite3
- Axios, Cheerio (scraping)
- Nodemailer (e-mail)
- node-telegram-bot-api (Telegram)
- API WhatsApp Business (integração futura)
- Docker-ready

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/farejador-verbas.git
   cd farejador-verbas
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente (crie um arquivo `.env`):
   ```
   PORT=3000
   HOST=0.0.0.0
   MAIL_USER=seu_email@gmail.com
   MAIL_PASS=sua_senha
   TELEGRAM_TOKEN=SEU_TOKEN_BOT
   TELEGRAM_CHAT_ID=SEU_CHAT_ID
   ```

4. Inicie o sistema:
   ```bash
   npm start
   ```

5. Acesse o dashboard:
   ```
   http://localhost:3000/dashboard
   ```

## Endpoints REST principais

- `/priority-areas` (GET, POST, PUT, DELETE)
- `/funding-sources` (GET, POST, PUT, DELETE)
- `/opportunities` (GET, POST, PUT, DELETE)
- `/users` (GET, POST, PUT, DELETE)
- `/applications` (GET, POST, PUT, DELETE)
- `/dashboard` (GET - painel dinâmico)

## Observações

- Para integração real com WhatsApp, configure um número empresarial e a API do provedor.
- O scraping do SICONV está em `scrapers/siconv.js` (ajuste conforme estrutura real do portal).
- A estrutura suporta fácil expansão de fontes, áreas e canais de notificação.

---

Desenvolvido para atender às necessidades de captação estratégica de recursos por prefeituras brasileiras.