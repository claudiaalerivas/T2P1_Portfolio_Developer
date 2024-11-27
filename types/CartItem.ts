import { ImageSourcePropType } from "react-native"

export type CartItem = {
    id: string,
    name: string,
    quantity: number,
    image?: ImageSourcePropType,
    category: string,
    price: number,
    obtained: boolean
}