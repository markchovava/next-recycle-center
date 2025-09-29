"use client"

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

  return (
    <div className='w-full'>
        <p className='mb-1 font-light'>{label}:</p>
        <input 
            type={type}
            value={value} 
            name={name}
            onChange={onChange}
            placeholder={placeholder} 
            className='w-full px-3 py-2 rounded-lg outline-none border border-gray-300 focus:border-gray-500 ease-initial duration-200 transition-all' />
    </div>
  )
}