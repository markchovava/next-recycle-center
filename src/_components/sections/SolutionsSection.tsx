import React from 'react'
import TitlePrimary from '../titles/TitlePrimary'
import { AboutData } from '@/_data/sample/AboutData'
import SpacerTertiary from '../spacers/SpacerTertiary'
import CardSecondary from '../cards/CardSecondary'


export default function SolutionsSection() {
  return (
     <section className="w-full">
        <div className="mx-auto lg:w-[80%] w-[92%]">
            <TitlePrimary title={AboutData.solutions.title} />
            <SpacerTertiary />
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                {AboutData.solutions.items.map((i, key) => (
                    <CardSecondary key={key} dbData={i} />
                ))}
            </div>
        </div>
    </section>
  )
}
