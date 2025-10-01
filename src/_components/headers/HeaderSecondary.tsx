import React from 'react'
import NavPrimary from '../navs/NavPrimary'
import { AboutData } from '@/_data/sample/AboutData'



export default function HeaderSecondary() {
  return (
    <>
    <section className='relative w-full h-[38rem] bg-green-600'>
        {/* IMAGE */}
        <div className='absolute z-10 top-0 left-0 w-full h-[100%] bg-gradient-to-br from-transparent to-green-950'></div>
        
        <div className='absolute z-15 top-0 left-0 w-full h-[100%] flex flex-col'>
            <NavPrimary />
            <div className='flex-1 w-full grid grid-cols-2'>
                <div className='col-span-1 flex items-center justify-start pl-[8%]'>
                    <p className='text-[2.5rem] font-extrabold text-white leading-tight'>
                        {AboutData.intro}
                    </p>
                </div>
                <div className='flex items-center justify-end'></div>
            </div>
        </div>
    </section>
    </>
  )
}
