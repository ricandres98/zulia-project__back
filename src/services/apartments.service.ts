import { sequelize } from "../libs/sequelize";
import boom from "@hapi/boom";
import { CreateApartmentType, UpdateApartmentType } from "../types/apartments.type";

class ApartmentService {
	async checkApartmentExists(apartmentNumber: string) {
		const apartment = await sequelize.models.Apartment.findOne({
      where: {
        apartmentNumber: apartmentNumber
      }
    });
    
    if(apartment) {
      throw boom.conflict(`That apartment already exists`);
    }

    return true;
	}

  async findAll() {
		const apartments = await sequelize.models.Apartment.findAll();
		return apartments;
	}

  async findOne(id: number) {
		const apartment = await sequelize.models.Apartment.findByPk(id, {
      include: ["owner"]
    });
    
		if(!apartment) {
			throw boom.notFound("Id not found");
		}

		return apartment;
	}

  async create(data: CreateApartmentType) {
		await this.checkApartmentExists(data.apartmentNumber);
		const newApartment = await sequelize.models.Apartment.create(data as any);
		return newApartment;
	}

  async update(id: number, data: UpdateApartmentType) {
		const apartment = await this.findOne(id);
    
    if(data.apartmentNumber && apartment.dataValues.apartmentNumber !== data.apartmentNumber) {
      await this.checkApartmentExists(data.apartmentNumber);
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
