import { Period } from "./periods.type";

interface ExpenseType {
	description: string;
	amount: number;
}

export interface ReceiptType {
  id: number;
  createdAt: string;
  periodId: number;
  apartmentId: number;
  period: Period
}