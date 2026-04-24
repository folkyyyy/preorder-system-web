export type MenuItem = {
    id: number;
    name: string;
    price: number;
    description?: string;
    image_url?: string;
    isSpecialAllowed: boolean;
    specialPrice?: number;
}