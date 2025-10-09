"use client"


export default function ErrorPrimary({msg}: {msg: string}) {
  return (
    <>
    {msg &&
        <p className='text-sm text-red-500'>{msg}</p>
    }
    </>
  )
}
