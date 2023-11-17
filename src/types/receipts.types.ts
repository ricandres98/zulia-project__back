export interface ReceiptType {
	receiptId: number;
	emision: string;
	property: string;
	owner: string;
	billedMonth: string;
	year: number;
	aliquot: number;
	owedAmount: number;
	expenses: ExpenseType[];
	debt?: number | undefined;
	penalty?: number;
}

interface ExpenseType {
	description: string;
	amount: number;
}

export interface CreateReceiptType {
	periodId: number,
    apartmentId: number,
}