export interface ReceiptType {
	receiptId: number;
	emision: string;
	property: string;
	owner: string;
	billedMonth: string;
	year: number;
	aliquot: number;
	owedAmount: number;
	expenses: ExpenseType[],
}

interface ExpenseType {
	description: string;
	amount: number;
}