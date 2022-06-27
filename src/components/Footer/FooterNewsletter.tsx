import React from 'react'
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function FooterNewsletter() {
  return (
    <div className="mb-[60px] md:flex-half md:max-w-1/2 md:pr-[30px] xl:flex-a-quarter xl:max-w-a-quarter xl:px-[15px] xl:ml-[8%]">
      <h2 className="text-md font-medium uppercase mb-5">Newsletter</h2>
      <div className="mb-[15px] flex items-center text-sm font-medium text-gray-400 ">
        <p>
          Be the first to know about new arrivals, look books, sales & promos!
        </p>
      </div>
      <form action="submit" className="relative">
        <input
          type="text"
          placeholder="Your email"
          name=""
          id=""
          className="w-full bg-transparent border-b-2 border-white py-[15px] text-gray-400"
        />
        <button type="submit" className="absolute top-1/4 right-1">
          <FontAwesomeIcon icon={faEnvelope} />
        </button>
      </form>
    </div>
  );
}
