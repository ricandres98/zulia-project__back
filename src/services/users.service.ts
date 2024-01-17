import { sequelize } from "../libs/sequelize";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import { config } from "../config/config";
import { CreateUserDto, ReadUserDto, UpdateUserDto } from "../types/dto/users.dto";
import { User } from "../types/users.types";
import { Model } from "sequelize";

class UsersService {

  async checkUserAlreadyExists(email: string) {
    const user: false | Model<User> = await this.findByEmail(email);

    if(user) {
      throw boom.conflict("That email is already registered");
    }

    return true;
  }

  async create(data: CreateUserDto) {
    await this.checkUserAlreadyExists(data.email);
    if(data.password) {
      const hash = await bcrypt.hash(data.password, parseInt(config.hashingRounds as string));
      const user: Model<User> = await sequelize.models.User.create({
        ...data,
        password: hash
      });
  
      delete user.dataValues.password;
  
      return user;
    }
  }

  async findAll() {
    const users: Model<User>[] = await sequelize.models.User.findAll();
    users.forEach(user => {
      delete user.dataValues.password
    });

    return users;
  }

  async findByEmail(email: string) {
    const user: Model<User> | null = await sequelize.models.User.findOne({
      where: {
        email: email
      }
    });
    if(user) {
      return user;
    } else {
      return false;
    }
  }

  async findOne(id: number) {
    const user: Model<User> | null = await sequelize.models.User.findByPk(id, {
      include: ["apartment"]
    });
    if(!user) {
      throw boom.notFound("User does not exist");
    }

    delete user.dataValues.password;

    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    if (data.password) {
      const user = await this.findOne(id);
      const hash = await bcrypt.hash(data.password, parseInt(config.hashingRounds as string));
      const updatedUser = await user.update({
        password: hash
      });
      delete updatedUser.dataValues.password;
  
      return {
        message: "Updated successfully",
        updatedUser
      };
    }
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    await user.destroy();
    return id;
  }
}

export { UsersService };
