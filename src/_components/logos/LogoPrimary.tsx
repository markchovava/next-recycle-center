import Image from 'next/image'
import Link from 'next/link'


export default function LogoPrimary() {
  return (
    <>
    <Link href='/' className='flex items-center justify-center gap-2'>
        <Image 
            src="/assets/img/logo_icon.png" 
            alt="Logo" 
            width={80} 
            height={80} />
        <h1 className='leading-tight font-extrabold text-[2rem]'>
            Recycling Center
        </h1>
    </Link>
    </>
  )
}
