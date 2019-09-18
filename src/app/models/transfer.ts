export interface Transfer {
    user: number;
    date: Date;
    period: Date;
    description: string;
    amount: number;
    account: Account;
    to_ccount: Account;
    id: number;
}