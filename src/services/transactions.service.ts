import boom from "@hapi/boom";
import { Transaction } from "../types/transactions.types";
import { sequelize } from "../libs/sequelize";
import { Model } from "sequelize";
import { CreateTransactionDto } from "../types/dto/transactions.dto";


class TransactionsService {
  async findAll() {
    const transactions : Model<Transaction>[]= await sequelize.models.Transaction.findAll();
    return transactions;
  }

  async findOne(id: number) {
    const transaction : Model<Transaction> | null= await sequelize.models.Transaction.findByPk(id);
    if (!transaction) {
      throw boom.notFound("incorrect id");
    }

    return transaction;
  }

  async create(data: CreateTransactionDto) {
    const newTransaction : Model<Transaction>= await sequelize.models.Transaction.create(data as any);
    return newTransaction;
  }

  async update(id: number, data: CreateTransactionDto) {
		const transaction = await this.findOne(id);
		const updatedTransaction = await transaction.update(data);

		return updatedTransaction;
  }

	async delete(id: number) {
		const transaction = await this.findOne(id);
		await transaction.destroy();
		return { id };
	}
}

export { TransactionsService };
