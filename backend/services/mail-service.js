const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        })
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Активация аккаунта ${process.env.API_URL}`,
            text: '',
            html: `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }

    async sendWishesText(to, text) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER,
            subject: 'Пожеланию по улучшения приложения:',
            text: '',
            html: `
                <div>
                    <h1>Пожелание от пользователя ${to}</h1>
                    <p>${text}</p>
                </div>
            `
        })
    }

    async sendForgotMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            text: '',
            subject: 'Password reset link',
            html: `<h2>Please click on given link to reset password</h2>
                    <a href="${link}">${link}</a>`
        })
    }
}

module.exports = new MailService();
