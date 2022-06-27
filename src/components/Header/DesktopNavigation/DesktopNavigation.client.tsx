import React, { useEffect, useState } from 'react'
import { IItems } from '../types/interfaces';

export default function DesktopNavigation({ items }: IItems) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <div className='hidden md:block flex-half max-w-1/2 xl:max-w-[100%]'>
      <ul className='flex justify-center space-x-2.5 xl:space-x-4'>
        {items.map(item => (
          <li className={`py-1 after:block after:content-[''] after:border-b-2 after:border-red-700 after:scale-x-0 after:transition-all after:duration-500 hover:after:scale-x-100 ${item.url === url ? 'after:scale-x-100' : ""
            }`} key={item.id}>
            <a className="block md:text-base xl:text-lg font-semibold" href={`${item.url}`}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}