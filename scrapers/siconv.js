const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const { db } = require('../app');

// Função placeholder para buscar oportunidades no SICONV (Plataforma +Brasil)
async function fetchSiconvOpportunities() {
  // Exemplo: URL de consulta de editais na Plataforma +Brasil (ajustar conforme pesquisa futura)
  const url = 'https://www.convenios.gov.br/portal/consulta/consulta-convenios.html';
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Exemplo de seleção: ajustar conforme estrutura real da página
    $('.resultado-consulta-tr').each((i, el) => {
      const title = $(el).find('.titulo-edital').text().trim();
      const description = $(el).find('.descricao').text().trim();
      const value = parseFloat($(el).find('.valor-total').text().replace(/\D/g, '')) || null;
      const deadline = $(el).find('.prazo').text().trim() || null;
      const url_edital = $(el).find('a').attr('href') || url;

      // Inserir ou atualizar oportunidade no banco de dados (simplificado)
      db.run(
        `INSERT INTO opportunities (title, description, value, deadline, url, status) 
        VALUES (?, ?, ?, ?, ?, 'novo')`,
        [title, description, value, deadline, url_edital],
        function (err) {
          if (err) {
            // Pode ser por duplicidade, etc. Tratamento aprimorado em versões futuras.
            // console.error('Erro ao inserir oportunidade:', err.message);
          }
        }
      );
    });

    console.log('Busca SICONV concluída.');
  } catch (error) {
    console.error('Erro ao buscar oportunidades SICONV:', error.message);
  }
}

// Para testes manuais
if (require.main === module) {
  fetchSiconvOpportunities();
}

module.exports = { fetchSiconvOpportunities };