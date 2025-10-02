import React from 'react'
import NavPrimary from '../navs/NavPrimary'
import { AboutData } from '@/_data/sample/AboutData'



export default function HeaderTertiary({title}: {title: string} ) {
  return (
    <>
    <section className='relative w-full h-[20rem] bg-green-600'>
        {/* IMAGE */}
        <div className='absolute z-10 top-0 left-0 w-full h-[100%] bg-gradient-to-br from-transparent to-green-950'></div>
        
        <div className='absolute z-15 top-0 left-0 w-full h-[100%] flex flex-col'>
            <NavPrimary />
            <div className='w-full flex-1 flex items-center justify-center'>
                <p className='text-[3.5rem] text-center font-extrabold text-white leading-tight'>
                    {title}
                </p>
            </div>
            
        </div>
    </section>
    </>
  )
}
