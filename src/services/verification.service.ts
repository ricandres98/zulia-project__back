import { sequelize } from "../libs/sequelize";
import boom from "@hapi/boom";
import { User } from "../types/users.types";
import { Model } from "sequelize";
import { VerificationTuple } from "../types/verifications.types";
import { VerifyCodeDto, VerifyEmailDto } from "../types/dto/verifications.dto";
import { createRandomCode } from "../utils/createRandomCode";
import { EmailService } from "./email.service";
import { isConstructorDeclaration } from "typescript";

class VerificationService {
  private emailService: EmailService;
  
  constructor() {
    this.emailService = new EmailService();
  }

  async verifyEmail(data: VerifyEmailDto) {
    const { email } = data;
    console.log("Email received: ", email);
    const code = createRandomCode(6);
    console.log("Code generated: ", code);

    const emailExists = await this.checkEmailAlreadyExists(email);

    let verificationTuple: Model<VerificationTuple> | false = false;

    if (emailExists) {
      verificationTuple = (await this.findByEmail(
        email
      )) as Model<VerificationTuple>;
      verificationTuple.update({ code });
    } else {
      verificationTuple =
        await sequelize.models.Verification.create({
          email,
          code,
        });
    }
    /** Send email with code using nodemailer */
    console.log("Sending email...");
    this.emailService.sendEmail({
      from: "",
      to: email,
      subject: "Verification Code",
      text: `Your verification code is ${code}`,
      html: `<h1>Your verification code is ${code}</h1>`,
    });
    
    return { message: "Sending email..."}; 
  }

  async checkEmailAlreadyExists(email: string) {
    const verificationTuple: false | Model<VerificationTuple> =
      await this.findByEmail(email);

    if (verificationTuple) {
      return true;
    } else {
      return false;
    }
  }

  async verifyCode(data: VerifyCodeDto) {
    const { email, code } = data
    const verificationTuple = await this.findByEmail(email);
    if (!verificationTuple) {
      return {
        /** true if code is verified, false if not or error */
        status: false,
        message: "Email is not in database",
      }
    }
    
    const codesMatch = verificationTuple.dataValues.code === code;
    /** Remember to verify if code is expired */
    if (codesMatch) {
      return {
        status: true, 
        message: "Email verified"
      }
    } else {
      return {
        status: false,
        message: "Wrong code"
      }
    }
  }

  // async create(data: CreateUserDto) {
  //   await this.checkUserAlreadyExists(data.email);
  //   if (data.password) {
  //     const hash = await bcrypt.hash(
  //       data.password,
  //       parseInt(config.hashingRounds as string)
  //     );
  //     const user: Model<User> = await sequelize.models.User.create({
  //       ...data,
  //       password: hash,
  //     });

  //     delete user.dataValues.password;

  //     return user;
  //   }
  // }

  async findAll() {
    const users: Model<User>[] = await sequelize.models.User.findAll();
    users.forEach((user) => {
      delete user.dataValues.password;
    });

    return users;
  }

  async findByEmail(email: string) {
    const verificationTuple: Model<VerificationTuple> | null =
      await sequelize.models.Verification.findOne({
        where: {
          email: email,
        },
      });
    if (verificationTuple) {
      return verificationTuple;
    } else {
      return false;
    }
  }

  async findOne(id: number) {
    const user: Model<User> | null = await sequelize.models.User.findByPk(id, {
      include: ["apartment"],
    });
    if (!user) {
      throw boom.notFound("User does not exist");
    }

    delete user.dataValues.password;

    return user;
  }
}

export { VerificationService };
