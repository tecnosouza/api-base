require('dotenv').config();
const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

        if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
            console.error('❌ Erro: As configurações SMTP no .env estão incompletas. Verifique SMTP_HOST, SMTP_PORT, SMTP_USER e SMTP_PASS.');
            throw new Error('Configurações SMTP incompletas.');
        }

        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: parseInt(SMTP_PORT, 10),
            secure: SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });
    }

    async sendEmail(to, subject, htmlContent) {
        try {
            const mailOptions = {
                from: process.env.SMTP_USER,
                to,
                subject,
                html: htmlContent,
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent: %s', to);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email.');
        }
    }
}

module.exports = new EmailService();
