"use client"

import { useState } from "react"
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuEyeClosed } from "react-icons/lu";



interface TextInputPrimaryProps {
    type?: string,
    label?: string
    name: string,
    value: string | number,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}




export default function TextInputPrimary({
  type="text", 
  label, 
  name, 
  value, 
  placeholder, 
  onChange
}: TextInputPrimaryProps
) {

  const [isToggle, setIsToggle] = useState(false)
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsToggle(!isToggle)
  }

  return (
    <div className='w-full'>
        <p className='mb-1 font-light'>{label}:</p>
        {type == 'password' ?
          <div className={`rounded-lg overflow-hidden flex items-center justify-start border 
            border-gray-300 focus:border-gray-500 ease-initial duration-200 transition-all`}>
            <input 
                type={isToggle ? "text" : "password"}
                value={value} 
                name={name}
                onChange={onChange}
                placeholder={placeholder} 
                className={`w-full px-3 py-2 outline-none `} />
              <button onClick={handleToggle} className="text-xl px-2">
                { isToggle ? <MdOutlineRemoveRedEye /> : <LuEyeClosed /> }
              </button>
          </div>
          :
          <input 
                type={type}
                value={value} 
                name={name}
                onChange={onChange}
                placeholder={placeholder} 
                className='w-full px-3 py-2 rounded-lg outline-none border border-gray-300 focus:border-gray-500 ease-initial duration-200 transition-all' />
        }



    </div>
  )
}