import { NavLinksData } from '@/_data/sample/NavLinksData'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
     <footer className="bg-green-900 py-6 text-gray-300">
        <div className="w-[92%] mx-auto flex items-center justify-between">
            <ul className="flex items-center justify-start gap-3">
                {NavLinksData.map((i, key) => (
                    <React.Fragment key={key}>
                        <Link href={i.href}>
                            <li className="hover:underline">{i.title}</li>
                        </Link>
                        {(key + 1) < NavLinksData.length && (
                            <li>|</li>
                        )}
                    </React.Fragment>
                ))}
            </ul>

            <p className="">&copy; RecycleMate {new Date().getFullYear()}</p>
        </div>
    </footer>
  )
}