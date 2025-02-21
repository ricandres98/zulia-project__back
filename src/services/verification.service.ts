import { sequelize } from "../libs/sequelize";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import { config } from "../config/config";
import { User } from "../types/users.types";
import { Model } from "sequelize";
import { VerificationTuple } from "../types/verifications.types";
import { VerifyEmailDto } from "../types/dto/verifications.dto";

class VerificationService {
  async verifyEmail(data: VerifyEmailDto) {
    const { email } = data;
    /** Create a random number and assign it to a tuple in the DB 
     * along with the email address
     * 
     * It might (and should) be a different service
    */

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
