import { CartItem } from "../types/CartItem";

export const initialCartItemList: CartItem[] = [
    {
      name: 'Leche',
      cantidad: 2,
      image: require('../assets/images/drinks.png'),
      category: 'Bebidas',
      price: 1.5,
      obtained: false,
    }, 
    {
      name: 'Solomillo',
      cantidad: 2,
      image: require('../assets/images/meat.png'),
      category: 'Bebidas',
      price: 1.5,
      obtained: true,
    }, 
  ]