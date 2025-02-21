import { sequelize } from "../libs/sequelize";
import boom from "@hapi/boom";
import jwt from "jsonwebtoken";
import { CreateApartmentDto, UpdateApartmentDto } from "../types/dto/apartments.dto";
import { Apartment } from "../types/apartments.type";
import { Model } from "sequelize";
import { config } from "../config/config";
import { UsersService } from "./users.service";
import { Payload } from "../types/auth.types";
import { User } from "../types/users.types";

const usersService = new UsersService();

class ApartmentService {
	async checkApartmentExists(apartmentNumber: string) {
		const apartment: Model<Apartment> | null = await sequelize.models.Apartment.findOne({
      where: {
        apartmentNumber: apartmentNumber
      }
    });
    
    if(apartment) {
      return apartment.dataValues.id;
    } else {
      return false;
    }
	}

  async findAll() {
		const apartments: Model<Apartment>[] = await sequelize.models.Apartment.findAll();
		return apartments;
	}

  async findOne(id: number) {
		const apartment: Model<Apartment> | null= await sequelize.models.Apartment.findByPk(id, {
      include: ["owner"]
    });
    
		if(!apartment) {
			throw boom.notFound("Id not found");
		}

		return apartment;
	}
  
  async findOneByToken(token: string) {
    const payload = jwt.verify(token, config.jwtSecret as string);
    if (!payload) {
      throw boom.notFound("Is not a valid token");
    }
    // payload = {
    //   sub: user.id,
    //   role: user.role
    // };
    const apartment = await this.findOne(((<unknown>payload) as Payload).apt);

    return apartment;
  }

  async create(data: CreateApartmentDto) {
		const apartmentAlreadyExists = await this.checkApartmentExists(data.apartmentNumber);
    if (apartmentAlreadyExists) {
      throw boom.conflict(`That apartment already exists`);
    }
		const newApartment: Model<Apartment> = await sequelize.models.Apartment.create(data as any);
		return newApartment;
	}

  async update(id: number, data: UpdateApartmentDto) {
		const apartment = await this.findOne(id);
    
    if(data.apartmentNumber && apartment.dataValues.apartmentNumber !== data.apartmentNumber) {
      const apartmentAlreadyExists = await this.checkApartmentExists(data.apartmentNumber);
      if (apartmentAlreadyExists) {
        throw boom.conflict(`That apartment already exists`);
      }
    }

    const updatedOwner = await apartment.update(data);
    return updatedOwner;
	}

  async delete(id: number) {
		const apartment = await this.findOne(id);
    await apartment.destroy();
    return id;
	}
}

export { ApartmentService };
