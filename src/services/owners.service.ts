import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize";
import { CreateOwnerType, UpdateOwnerType } from "../types/owners.type";

class OwnerService {
  async checkOwnerExists(personId: number) {
    const owner = await sequelize.models.Owner.findOne({
      where: {
        personId: personId
      }
    });
    
    if(owner) {
      throw boom.conflict(`That owner already exists`)
    }

    return true;
  }

  async create(data: CreateOwnerType) {
    await this.checkOwnerExists(data.personId);
    const newOwner = await sequelize.models.Owner.create(data as any);
    return newOwner;
  }

  async findAll() {
    const owners = await sequelize.models.Owner.findAll();
		return owners;
  }

  async findOne(id: number) {
    const owner = await sequelize.models.Owner.findByPk(id);
    if(!owner) {
      throw boom.notFound("Id not found");
    }

    return owner;
  }

  async update(id: number, data: UpdateOwnerType) {
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
