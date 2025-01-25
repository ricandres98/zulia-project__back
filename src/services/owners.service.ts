import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize";
import { CreateOwnerDto, UpdateOwnerDto } from "../types/dto/owners.dto";
import { Model } from "sequelize";
import { Owner } from "../types/owners.type";
import { ApartmentService } from "./apartments.service";

const apartmentService = new ApartmentService();

class OwnerService {
  async checkOwnerExists(personId: number) {
    const owner: Model<Owner> | null = await sequelize.models.Owner.findOne({
      where: {
        personId: personId
      }
    });
    
    if(!owner) {
      return false;
    }

    return true;
  }

  async create(data: CreateOwnerDto) {
    const ownerExists = await this.checkOwnerExists(data.personId);
    if(ownerExists) {
      throw boom.conflict(`That owner already exists`);
    } 
    const newOwner: Model<Owner> = await sequelize.models.Owner.create(data);
    return newOwner;
  }

  async findAll() {
    const owners: Model<Owner>[] = await sequelize.models.Owner.findAll();
		return owners;
  }

  async findOneAsAdmin(id: number) {
    const owner: Model<Owner> | null = await sequelize.models.Owner.findByPk(id);
    if(!owner) {
      throw boom.notFound("Id not found");
    }

    return owner;
  }

  async findOneByPersonId(personId: number) {
    const owner: Model<Owner> | null = await sequelize.models.Owner.findOne({
      where: {
        personId: personId
      }
    });

    return owner;
  }

  async findOne(apartmentId: number) {
    const apartment = await apartmentService.findOne(apartmentId);
    const owner: Model<Owner> | null = await sequelize.models.Owner.findByPk(apartment.dataValues.ownerId);
    
    if(!owner) {
      throw boom.notFound("Id not found");
    }

    return owner;
  }

  async update(id: number, data: UpdateOwnerDto) {
    const owner = await this.findOne(id);
    
    if(data.personId && owner.dataValues.personId !== data.personId) {
      await this.checkOwnerExists(data.personId);
    }

    const updatedOwner = await owner.update(data);
    return updatedOwner;
  }

  async delete(id: number) {
    const owner = await this.findOne(id);
    await owner.destroy();
    return id;
  }
}

export { OwnerService };
