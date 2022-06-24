import React from 'react'

export default function FooterDocs() {
  return (
    <div className="mb-[30px] md:flex-a-quarter md:max-w-a-quarter md:pl-[30px] xl:flex-16 xl:max-w-16 xl:px-[15px]">
      <h2 className="text-md font-medium uppercase mb-4">Docs</h2>
      <ul className="mt-8 space-y-4 text-gray-400">
        <li className="flex items-center text-sm font-medium hover:text-gray-900">
          <a href="https://shopify.dev/custom-storefronts/hydrogen">
            Hydrogen overview
          </a>
        </li>
        <li className="flex items-center text-sm font-medium hover:text-gray-900">
          <a href="https://shopify.dev/custom-storefronts/hydrogen/getting-started">
            Demo Store template
          </a>
        </li>
      </ul>
    </div>
  );
}
