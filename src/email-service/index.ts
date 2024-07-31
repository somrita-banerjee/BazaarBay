import { Injectable, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
    constructor(private readonly configService: ConfigService) {
        const sendGridApiKey =
            this.configService.get<string>('SENDGRID.API_KEY');
        SgMail.setApiKey(sendGridApiKey);
    }

    private async sendMail(to: string, subject: string, html: string) {
        const msg: SgMail.MailDataRequired = {
            to,
            from: this.configService.get<string>('SENDGRID.SENDER_ADDRESS'),
            subject,
            html,
        };

        try {
            await SgMail.send(msg);
        } catch (error) {
            throw error;
        }
    }

    async sendWelcomeMail(to: string, name: string) {
        const subject = 'Welcome to Our Service!';
        const html = `
        <html>
        <body>
            <h1>Welcome, ${name}!</h1>
            <p>Thank you for joining our service. We are thrilled to have you on board.</p>
            <p>To get started, please visit our website and explore the features we offer.</p>
            <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
            <p>Best regards,<br>The Team</p>
        </body>
        </html>
    `;
        await this.sendMail(to, subject, html);
    }
}

@Module({
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailServiceModule {}
