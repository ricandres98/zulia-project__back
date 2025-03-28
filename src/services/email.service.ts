import { config } from '../config/config';
import nodemailer from 'nodemailer';
import { mailOptions } from '../types/emails.types';

class EmailService {
  private transport: nodemailer.Transporter;
  constructor() {
    this.transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
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

    await this.transport.sendMail(mailOptions, (err, info) => {
      if(err) {
        console.log(info);
        throw err;
      } else {
        console.log("Message sent: ", info);
      }
    });
    this.transport.close();
  }

}

export { EmailService };
