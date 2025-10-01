
import Link from "next/link";
import LogoPrimary from "../logos/LogoPrimary";
import { NavLinksData } from "@/_data/sample/NavLinksData";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonSecondary from "../buttons/ButtonSecondary";



export default function NavPrimary() {
  return (
    <nav className='flex justify-between items-center gap-4 pr-[4%]'>
        <div className='bg-white text-green-800 p-2'>
            <LogoPrimary />
        </div>
        <ul className='text-white text-xl flex items-center justify-start gap-4'>
            {NavLinksData.map((i, key) => (
                <Link key={key} href={i.href}>
                    <li className='font-medium py-3 hover:text-gray-100 border-b-2 border-transparent hover:border-gray-100 ease-initial duration-200 transition-all'>
                        {i.title}</li>
                </Link>
            ))}
        </ul>
        <Link href="/login">
            <ButtonSecondary 
            title="Login"
            css="px-8 py-3 text-xl" 
            />
        </Link>
    </nav>
  )
}
