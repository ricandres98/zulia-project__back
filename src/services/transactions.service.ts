import { faker } from "@faker-js/faker";
import boom from "@hapi/boom";
import { TransactionType } from "../types/transactions.types";
import { sequelize } from "../libs/sequelize";

interface TransactionWithId extends TransactionType {
  id: number;
}

interface TransactionsService {
  transactions: TransactionWithId[];
}

class TransactionsService {
  async findAll() {
    const transactions = await sequelize.models.Transaction.findAll();
    return transactions;
  }

  async findOne(id: number) {
    const transaction = await sequelize.models.Transaction.findByPk(id);
    if (!transaction) {
      throw boom.notFound("incorrect id");
    }

    return transaction;
  }

  async create(data: TransactionType) {
    const newTransaction = await sequelize.models.Transaction.create(data as any);
    return newTransaction;
  }

  async update(id: number, data: TransactionType) {
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
