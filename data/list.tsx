import { info } from "../types/type";

export const initialForm: info[] = [
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