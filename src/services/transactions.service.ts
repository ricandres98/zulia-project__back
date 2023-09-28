import { faker } from "@faker-js/faker";
import boom from "@hapi/boom";
import { Transaction } from "../types/transactions.types";
import { number } from "joi";

interface TransactionWithId extends Transaction {
  id: number;
}

interface TransactionsService {
  transactions: TransactionWithId[];
}

class TransactionsService {
  constructor() {
    this.transactions = [];
		this.create();
  }

  create() {
    for (let i = 0; i < 15; i++) {
			const transaction: TransactionWithId = {
				id: i,
				date: faker.date.recent(),
				amount: parseFloat(faker.commerce.price({min: 100, max: 3000})),
				reference: faker.string.numeric(10),
				description: faker.commerce.product(),
			};

			this.transactions.push(transaction);
		}
  }

	async findAll() {
		return this.transactions;
	}

	async createNewTransaction({ amount, date, description, reference }: Transaction) {
		const alreadyExist = this.transactions.some(
      (transaction) => transaction.reference === reference
    );

		if (alreadyExist) {
			throw boom.conflict("Ya ha sido registrado ese número de referencia");
		} else {
			this.transactions.push({
				amount,
				date,
				description,
				reference,
				id: this.transactions.length,
			});

			return this.transactions[this.transactions.length - 1]
		}
	}

	async updateTransaction(id: number, bodyRequest: Transaction) {
		const transactionIndex = this.transactions.findIndex(
      (transaction) => transaction.id === id
    );

		if (transactionIndex === -1) {
			throw boom.badRequest("Transaction doesn't exist");
		} else {
			this.transactions[transactionIndex] = {
				...this.transactions[transactionIndex],
				...bodyRequest,
			}

			return this.transactions[transactionIndex];
		}
	}
}

export { TransactionsService };
