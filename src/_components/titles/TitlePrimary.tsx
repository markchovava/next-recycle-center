import React from 'react'
import Heading2 from '../headings/Heading2'


interface TitlePrimaryProps{
    title: string
}


export default function TitlePrimary({title}: TitlePrimaryProps) {
  return (
    <div>
        <Heading2 title={title} />
        <hr className="border-b border-green-600 mt-2" />
    </div>
  )
}
