import React from 'react';

export default function MiniCart() {
  return (
    <div className="absolute right-0 top-0 bg-zinc-200 text-zinc-900 p-4 min-h-full max-h-full w-screen max-w-xs md:max-w-md">
      <p className="">Carrinho</p>
      <div>
        <ul>
          <li>
            <div>
              <p>Imagem</p>
            </div>
            <div>
              <p>Nome</p>
              <span>Quantidade</span>
              <span>Preço</span>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div>
          <p>Frete</p>
          <input placeholder="00000-000" />
        </div>
        <div>
          <p>Subtotal</p>
          <p>R$ 999,99</p>
        </div>
        <div>
          <p>Descontos</p>
          <p>R$ 999,99</p>
        </div>
        <div>
          <p>Total</p>
          <p>R$ 999,99</p>
        </div>
      </div>
    </div>
  );
}
