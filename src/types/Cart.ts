import {CartProduct} from './Product';

export interface CartProps {
  items: CartProduct[];
  totalItemsCount: number;
  uniqueItemsCount: number;
  totalPrice: number;
  shipping: number;
  discounts: number;
}

export interface CartContextProps {
  cart: CartProps;
  isCartOpen: boolean;
  hooks: {
    addItemToCart: (item: CartProduct) => void;
    removeItemFromCart: (item: CartProduct) => void;
    clearCart: () => void;
    toggleCart: () => void;
  };
}
