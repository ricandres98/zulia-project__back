import { sequelize } from "../libs/sequelize";
import boom from "@hapi/boom";
import { CreatePeriodType, updatePeriodType } from "../types/periods.type";

class PeriodService {
  async create(data: CreatePeriodType) {
    const periodAlreadyExist = await sequelize.models.Period.findOne({
      where: {
        month: data.month,
        year: data.year,
      },
    });
    if (periodAlreadyExist) {
      throw boom.conflict(
        `That period is already created under the id: ${periodAlreadyExist.dataValues.id}`
      );
    }

    const newPeriod = await sequelize.models.Period.create(data as any);
    return newPeriod;
  }

  async findAll() {
    const periods = await sequelize.models.Period.findAll();
    return periods;
  }

	async findOne(id: number) {
		const period = await sequelize.models.Period.findByPk(id);
		if(!period) {
			throw boom.notFound("Id not found");
		}
		return period;
	}

	async update(id: number, data: updatePeriodType) {
		const period = await this.findOne(id);
		const newData = {
			...period.dataValues,
			...data
		};
		const periodAlreadyExist = await sequelize.models.Period.findOne({
      where: {
        month: newData.month,
        year: newData.year,
      },
    });
		if (periodAlreadyExist) {
      throw boom.conflict(
        `That period is already created under the id: ${periodAlreadyExist.dataValues.id}`
      );
    }

		const updatedPeriod = await period.update(data);
		return updatedPeriod;
	}

	async delete(id: number) {
		const period = await this.findOne(id);
		await period.destroy();
		return id;
	}
}

export { PeriodService };
