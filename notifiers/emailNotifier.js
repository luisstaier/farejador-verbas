const nodemailer = require('nodemailer');

// Configuração padrão (ajustar para produção)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER || 'seu_email@gmail.com',
    pass: process.env.MAIL_PASS || 'sua_senha'
  }
});

/**
 * Envia um e-mail de notificação
 * @param {string} to - E-mail de destino
 * @param {string} subject - Assunto do e-mail
 * @param {string} text - Corpo do e-mail (texto simples)
 * @param {string} html - Corpo do e-mail (HTML, opcional)
 */
async function sendEmailNotification({ to, subject, text, html }) {
  const mailOptions = {
    from: process.env.MAIL_USER || 'seu_email@gmail.com',
    to,
    subject,
    text,
    html
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info.response);
    return true;
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error.message);
    return false;
  }
}

module.exports = { sendEmailNotification };