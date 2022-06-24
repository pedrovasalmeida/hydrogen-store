import React from 'react'
import {Image, Link} from '@shopify/hydrogen';

export default function FooterInfo() {
  return (
    <div className="md:flex-half md:max-w-1/2 md:pr-[30px] xl:flex-a-quarter xl:max-w-a-quarter xl:px-[15px]">
      <div className="mb-[30px]">
        <Link to="/">
          <Image
            src="https://cdn.shopify.com/s/files/1/0610/1870/1985/files/xfooter-logo.webp?v=1650470632"
            width={196}
            height={18}
            alt="site logo"
          />
        </Link>
      </div>
      <div className="mb-[30px]">
        <p className="text-gray-400">
          The customer is at the heart of our unique business model, which
          includes design.
        </p>
      </div>
      <div className="mt-8 mb-[30px]">
        <Image
          src="https://cdn.shopify.com/s/files/1/0610/1870/1985/files/xpayment.webp?v=1650470957"
          width={218}
          height={23}
          alt="payment options"
        />
      </div>
    </div>
  );
}
