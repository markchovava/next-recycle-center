"use client"

interface TextInputSecondaryProps {
    type?: string,
    label?: string
    name: string,
    value: string | number,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}




export default function TextInputSecondary({
  type="text", 
  label, 
  name, 
  value, 
  placeholder, 
  onChange
}: TextInputSecondaryProps
) {

  return (
    <div className='w-full'>
        <p className='mb-1 font-light'>{label}</p>
        <input 
            type={type}
            value={value} 
            name={name}
            onChange={onChange}
            placeholder={placeholder} 
            className='w-full px-3 py-3 rounded-lg outline-none bg-green-800 border border-gray-200 focus:border-gray-50 ease-initial duration-200 transition-all' />
    </div>
  )
}