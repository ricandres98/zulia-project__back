interface Transaction {
    id: number;
    reference: string;
    amount: number;
    description: string;
    date: string;
    createdAt: string;
    periodId?: number;
}

export { Transaction };