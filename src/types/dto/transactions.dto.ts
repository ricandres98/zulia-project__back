import { Transaction } from "../transactions.types";

interface CreateTransactionDto extends Omit<Transaction, "id" | "createdAt"> {}

export { CreateTransactionDto };