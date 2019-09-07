import { SubCategory } from './subCategory';

export interface Category {
    id: number;
    group: string;
    type: string;
    name: string;
    sub_categoories: Array<SubCategory>
}