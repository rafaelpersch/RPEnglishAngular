import { Category } from "./category";

export class Word{
    id: string = '';
    name: string = '';
    translation: string = '';
    observation: string = '';
    categoryId: string = '';
    category?: Category;
}