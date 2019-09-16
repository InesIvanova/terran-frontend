import { Category } from './category';
import { Account } from './account';

export interface Transaction {
    id: number;
    user?: number;
    date: Date;
    period: Date;
    description: string;
    amount: number;
    category: Category;
    account: Account;
    type: string;
    to_account?: number;
}