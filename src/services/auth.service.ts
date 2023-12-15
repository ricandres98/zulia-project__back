import jwt from "jsonwebtoken";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import { UsersService } from "./users.service";
import { UserWithFields } from "../types/auth.types";
import { config } from "../config/config";

const service = new UsersService();

class AuthService {
  signToken(user: UserWithFields) {
    const payload = {
      sub: user.id,
      role: user.role
    };
    
    const token = jwt.sign(payload, config.jwtSecret as string);

    return {
      user,
      token,
    };
  }

  async getUser(email: string, password: string) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    } else {
      const isMatch = await bcrypt.compare(password, user.dataValues.password);
      if (!isMatch) {
        throw boom.unauthorized();
      } else {
        delete user.dataValues.password;
        return user;
      }
    }
  }
}

export { AuthService };
