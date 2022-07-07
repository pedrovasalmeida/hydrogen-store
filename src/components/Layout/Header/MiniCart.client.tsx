import React from 'react';

import {faClose} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useCart } from '../../../hooks/cartContext.client';

export default function MiniCart() {
  const {isCartOpen, hooks} = useCart();
  const {toggleCart} = hooks;

  return (
    <div
      className={`fixed 
      right-0 
      top-0 
      flex 
      flex-col 
       bg-zinc-200 
       text-zinc-900
        z-50 w-screen 
        max-w-[320px] 
        md:max-w-[448px] 
        h-screen 
        max-h-screen 
        p-4 
        transition-all 
        ease-linear 
        duration-300
        translate-x-[448px]
        ${isCartOpen && 'translate-x-0'}`}
    >
      <div className="flex items-center justify-between">
        <p className="font-bold text-lg md:text-2xl text-zinc-900">Carrinho</p>
        <FontAwesomeIcon
          onClick={toggleCart}
          icon={faClose}
          className="w-6 h-6 text-zinc-900"
        />
      </div>
      <div className="flex flex-col mt-auto">
        <div className="flex w-full items-center justify-between text-zinc-900">
          <p className="font-semibold text-base md:text-lg">Subtotal</p>
          <p className="font-semibold text-base md:text-lg">R$ 9999,99</p>
        </div>
        <div className="flex w-full items-center justify-between text-zinc-900">
          <p className="font-semibold text-base md:text-lg">Total</p>
          <p className="font-semibold text-base md:text-lg">R$ 9999,99</p>
        </div>
        <div className="flex w-full pt-4">
          <button className="flex items-center justify-center w-full py-3 bg-zinc-900 text-zinc-50 font-bold rounded-xl">
            Finalizar pedido
          </button>
        </div>
      </div>
    </div>
  );
}
