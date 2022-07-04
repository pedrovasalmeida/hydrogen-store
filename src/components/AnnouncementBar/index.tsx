import React from 'react';

export default function AnnouncementBar() {
  return (
    <section
      className="
        flex 
        bg-zinc-900 
        text-zinc-50 
        py-3
        w-full
      "
    >
      <div
        className="flex 
        items-center
        justify-between
        w-full
        xl:max-w-[1170px]
        mx-auto"
      >
        <div className="flex">
          <p className="flex font-light">Frete grátis para todo o Brasil.</p>
        </div>
        <div className="flex bg-zinc-900 text-zinc-50 gap-10 uppercase font-light">
          <p>Sign In</p>
          <p>FAQs</p>
          <select name="currency" className="flex bg-zinc-900">
            <option value="BRL" selected>
              BRL
            </option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>
    </section>
  );
}
