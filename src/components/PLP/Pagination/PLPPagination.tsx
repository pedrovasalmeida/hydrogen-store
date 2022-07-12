import React from 'react'

interface IPaginationProps {
  productsPerPage: number
  totalPosts: number
  handlePaginate: (num: number) => void
}

export default function PLPPagination({ totalPosts, productsPerPage, handlePaginate }: IPaginationProps) {
  const pageNums: number[] = []

  for (let index = 1; index <= Math.ceil(totalPosts / productsPerPage); index++) {
    pageNums.push(index)
  }

  return (
    <div className='mt-6'>
      <ul className='flex space-x-1'>
        {pageNums.map(num => (
          <li key={num}>
            <button onClick={() => handlePaginate(num)} className='font-bold hover:border border-black w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer'>
              {num}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}