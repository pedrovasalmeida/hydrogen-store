import React from 'react'
import {useMoney} from '@shopify/hydrogen/client';

/**
 * A client component that defines the currency code, currency symbol, and amount of a product
 */
export default function MoneyPrice({money}: any) {
  const {currencyCode, currencyNarrowSymbol, amount} = useMoney(money);
  return (
    <h5 className="text-black text-lg font-bold">
      {currencyCode}
      {currencyNarrowSymbol}
      {amount}
    </h5>
  );
}
