interface mailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
}
export { mailOptions };
// Compare this snippet from src/services/verification.service.ts:
// import { VerificationTuple } from '../types/verifications.types';
// import { VerifyEmailDto } from '../types/dto/verifications.dto';
// import { createRandomCode } from '../utils/createRandomCode';
// import { EmailService } from './email.service';
//
// class VerificationService {
//   private emailService: EmailService;
//   constructor() {
//     this.emailService = new EmailService();
//   }
//   async verifyEmail(data: VerifyEmailDto) {
//     const { email } = data;              