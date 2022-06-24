import React from 'react'

export default function Copyright() {
  return (
    <div className="py-6 md:px-[15px] bg-black border-t-[0.5px] border-gray-400 xl:max-w-[1170px] mx-auto xl:mt-10">
      <p className="text-gray-400 text-center">
        © {new Date().getFullYear()} Shopify
      </p>
    </div>
  );
}
