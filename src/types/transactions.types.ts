export interface TransactionType {
    date: Date;
    description: string;
    amount: number;
    reference: string;
    period_id?: number;
}