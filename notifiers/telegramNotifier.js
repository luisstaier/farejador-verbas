const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || 'SEU_TOKEN_AQUI';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || null; // Pode ser definido por usuário/grupo

// Inicializa o bot (modo polling para simplicidade)
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });

/**
 * Envia uma mensagem de notificação via Telegram
 * @param {string} message - Conteúdo da mensagem
 * @param {string|number} [chatId] - Chat ID de destino (opcional, padrão do .env)
 * @returns {Promise<boolean>}
 */
async function sendTelegramNotification(message, chatId) {
  try {
    const targetChat = chatId || TELEGRAM_CHAT_ID;
    if (!targetChat) throw new Error('Chat ID do Telegram não definido.');
    await bot.sendMessage(targetChat, message);
    console.log('Notificação Telegram enviada.');
    return true;
  } catch (error) {
    console.error('Erro ao enviar Telegram:', error.message);
    return false;
  }
}

module.exports = { sendTelegramNotification };