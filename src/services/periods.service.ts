import { sequelize } from "../libs/sequelize";
import boom from "@hapi/boom";
import { CreatePeriodDto, updatePeriodDto } from "../types/dto/periods.dto";
import { Model } from "sequelize";
import { Period } from "../types/periods.type";

class PeriodService {
  async checkPeriodIsValid(month: number, year: number) {
    const periodAlreadyExist: Model<Period> | null = await sequelize.models.Period.findOne({
      where: {
        month: month,
        year: year,
      },
    });
    if (periodAlreadyExist) {
      throw boom.conflict(
        `That period is already created under the id: ${periodAlreadyExist.dataValues.id}`
      );
    }

    return true;
  }

  async create(data: CreatePeriodDto) {
    await this.checkPeriodIsValid(data.month, data.year);

    const newPeriod: Model<Period> = await sequelize.models.Period.create(data);
    return newPeriod;
  }

  async findAll() {
    const periods: Model<Period>[] = await sequelize.models.Period.findAll();
    return periods;
  }

	async findOne(id: number) {
		const period: Model<Period> | null = await sequelize.models.Period.findByPk(id);
		if(!period) {
			throw boom.notFound("Id not found");
		}
		return period;
	}

	async update(id: number, data: updatePeriodDto) {
		const period = await this.findOne(id);
		const newData = {
			...period.dataValues,
			...data
		};
    await this.checkPeriodIsValid(newData.month, newData.year);

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
