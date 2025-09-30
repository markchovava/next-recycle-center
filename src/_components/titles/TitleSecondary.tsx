import React from 'react'
import Heading3 from '../headings/Heading3'


interface TitleSecondaryProps{
    title: string
}


export default function TitleSecondary({title}: TitleSecondaryProps) {
  return (
    <div className='w-full'>
        <Heading3 title={title} />
        <hr className="border-b border-green-600 mt-2" />
    </div>
  )
}
