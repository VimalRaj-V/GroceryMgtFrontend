import { CartItem } from "./cart-item";
import { Customer } from "./customer";

export interface Cart {
    customer: Customer;
	itemList: CartItem[];
}
