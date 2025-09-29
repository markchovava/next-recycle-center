"use client"


export default function Heading1({ title }: { title: string }) {
  return (
    <h1 className="text-[2.8rem] font-extrabold leading-tight">
        {title}
    </h1>
  )
}
