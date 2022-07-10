import React, { useEffect, useState } from 'react'

function Breadcrumbs() {
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([])

  useEffect(() => {
    setBreadcrumbs(window.location.href.split("/").slice(3))
  }, [])

  return (
    <section className='py-10 bg-[#f3f2ee] flex justify-center'>
      <div className='px-4 md:px-[2.95rem] xl:max-w-[1170px] xl:px-7 w-full'>
        <h1 className='text-2xl font-bold mb-2'>
          Shop
        </h1>
        <ul className='flex space-x-2'>
          <li>
            <a href="/">
              Home
            </a>
          </li>
          {breadcrumbs.map((crumb: string) => (
            <li key={breadcrumbs.indexOf(crumb)}>
              <a href={`/`}>
                &gt; {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section >
  )
}

export default Breadcrumbs