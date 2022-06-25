import React, {createContext, useMemo, useState} from 'react';
import {CartContextProps, CartProps} from '../types/Cart';
import {CartProduct} from '../types/Product';

const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({children}: {children: React.ReactNode}) => {
  const [cart, setCart] = useState({} as CartProps);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen((prevState) => !prevState);

  /** Return true if success. False otherwise. */
  const saveCartInfoIntoLocalStorage = (cart: CartProps) => {
    if (typeof window !== undefined) {
      const cartStringified = JSON.stringify(cart);
      window.localStorage.setItem('@hydrogen-store/cart', cartStringified);
      return true;
    }

    return false;
  };

  const getCartInfoFromLocalStorage = () => {
    if (typeof window !== undefined) {
      const cartInfo = window.localStorage.getItem('@hydrogen-store/cart');

      if (!cartInfo) return undefined;

      const cartFromStorage = JSON.parse(cartInfo) as CartProps;

      return cartFromStorage;
    }
  };

  const calculateCartTotalPrice = useMemo(
    () =>
      cart.items.reduce((acumulator, current) => acumulator + current.price, 0),
    [cart],
  );

  const calculateCartUniqueItemsCount = useMemo(
    () => cart.items.length,
    [cart],
  );

  const calculateCartTotalItemsCount = useMemo(
    () =>
      cart.items.reduce(
        (acumulator, current) => acumulator + current.quantity,
        0,
      ),
    [cart],
  );

  const addItemToCart = (item: CartProduct) => {
    if (!item) return;

    setCart((prevState) => {
      const updatedCart = prevState.items;

      updatedCart.push(item);

      return {
        ...prevState,
        items: updatedCart,
      };
    });
  };

  const removeItemFromCart = (item: CartProduct) => {
    const itemFromCart = cart.items.find((cartItem) => cartItem.id === item.id);

    if (!itemFromCart) return;

    setCart((prevState) => {
      const filteredCartItems = prevState.items.filter(
        (cartItem) => cartItem.id !== itemFromCart.id,
      );

      return {
        ...prevState,
        items: filteredCartItems,
      };
    });
  };

  const clearCart = () => {
    const cleanCartObject: CartProps = {
      items: [],
      totalItemsCount: 0,
      uniqueItemsCount: 0,
      totalPrice: 0,
      shipping: 0,
      discounts: 0,
    };

    setCart(cleanCartObject);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        hooks: {
          addItemToCart,
          removeItemFromCart,
          clearCart,
          toggleCart,
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  if (!CartContext)
    throw new Error('CartContext must be used as children of cart provider');

  return CartContext;
};
