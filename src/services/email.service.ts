import { config } from '../config/config';
import nodemailer from 'nodemailer';
import { mailOptions } from '../types/emails.types';

class EmailService {
  private transport: nodemailer.Transporter;
  constructor() {
    this.transport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 465,
      secure: true,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    })
  }

  async sendEmail(mailOptions: mailOptions) {
    mailOptions.from = config.emailUser!;

    const response = await this.transport.sendMail(mailOptions);
    console.log(response);
    this.transport.close();
    return response;
  }

}

export { EmailService };
