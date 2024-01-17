import jwt, { JwtPayload } from "jsonwebtoken";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import { UsersService } from "./users.service";
import { Payload, UserWithFields } from "../types/auth.types";
import { config } from "../config/config";

const service = new UsersService();

class AuthService {
  signToken(user: UserWithFields) {
    const payload: Payload = {
      sub: user.id,
      role: user.role,
      apt: user.apartmentId
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
      const isMatch = await bcrypt.compare(password, user.dataValues.password as string);
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
