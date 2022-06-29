import React from 'react'
import Copyright from './Copyright';
import FooterInfo from './FooterInfo';
import FooterPages from './FooterPages';
import FooterDocs from './FooterDocs';
import FooterNewsletter from './FooterNewsletter';
import { IFooterProps } from './types/interfaces';

/**
 * A server component that specifies the content of the footer on the website
 */
export default function Footer({collectionHandle, productHandle}: IFooterProps) {
  return (
    <footer role="contentinfo" className="relative text-white">
      <div className="bg-black px-5 pt-[70px]">
        <div className="mx-auto flex flex-col md:flex-row md:flex-wrap md:max-w-[720px] xl:max-w-[1170px]">
          <FooterInfo />
          <FooterPages 
          collectionHandle={collectionHandle}
          productHandle={productHandle}
          />
          <FooterDocs />
          <FooterNewsletter />
        </div>
        <Copyright />
      </div>
    </footer>
  );
}
