/**
 * WhatsApp Notifier - Placeholder para integração com API do WhatsApp Business.
 *
 * Observação:
 * A API oficial do WhatsApp Business exige número empresarial verificado,
 * credenciais de acesso e configuração de webhook.
 * Recomenda-se usar provedores como Twilio, Z-API, WATI ou a API Cloud do Meta/Facebook.
 *
 * Para produção:
 * 1. Crie uma conta comercial no Facebook Business.
 * 2. Obtenha acesso à API Cloud WhatsApp (https://developers.facebook.com/docs/whatsapp).
 * 3. Configure as variáveis de ambiente para armazenar tokens e números.
 */

async function sendWhatsAppNotification({ to, message }) {
  // TODO: Implementar integração real com a API do WhatsApp Business.
  // Exemplo de parâmetro: { to: "+5511999999999", message: "Nova oportunidade disponível!" }
  // Integração sugerida: HTTP POST para endpoint do provedor (Twilio, Meta, etc).
  // Para desenvolvimento, apenas simula envio:
  console.log(`[Simulação] WhatsApp enviado para ${to}: ${message}`);
  return true;
}

module.exports = { sendWhatsAppNotification };