import { CartItem } from "../types/CartItem";

export const initialCartItemList: CartItem[] = [
    {
      id: '12345678',
      name: 'Leche',
      quantity: 2,
      image: require('../assets/images/drinks.png'),
      category: 'Bebidas',
      price: 1.5,
      obtained: false,
    }, 
    {
      id: '87654321',
      name: 'Solomillo',
      quantity: 2,
      image: require('../assets/images/meat.png'),
      category: 'Bebidas',
      price: 1.5,
      obtained: true,
    }, 
  ]