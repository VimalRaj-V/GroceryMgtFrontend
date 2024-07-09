import { CartItem } from "./cart-item";

export interface CartDto {
    customerUserName: string;
    itemList: CartItem[];
}
