export interface Transaction {
    date: Date;
    period: Date;
    description: string;
    amount: number;
    credit: string;
    debit: string;
    income: boolean;
    expense: boolean;
}