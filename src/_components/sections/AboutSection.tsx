import React from 'react'
import TitlePrimary from '../titles/TitlePrimary'
import { AboutData } from '@/_data/sample/AboutData'
import SpacerTertiary from '../spacers/SpacerTertiary'



export default function AboutSection() {
  return (
    <section className="w-full">
        <div className="mx-auto w-[70%]">
            <TitlePrimary title={AboutData.title} />
            <SpacerTertiary />
            <div className="font-light text-2xl">
                {AboutData.details}
            </div>
        </div>
    </section>
  )
}
