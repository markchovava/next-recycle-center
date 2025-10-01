"use client"

interface TextAreaSecondaryProps {
    label?: string
    name: string,
    value: string | number,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}




export default function TextAreaSecondary({
  label, 
  name, 
  value, 
  placeholder, 
  onChange
}: TextAreaSecondaryProps
) {

  return (
    <div className='w-full'>
        <p className='mb-1 font-light'>{label}</p>
        <textarea
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            className='w-full h-[10rem] p-3 rounded-lg outline-none bg-green-800 border border-gray-200 focus:border-gray-50 ease-initial duration-200 transition-all'
        />
    </div>
  )
}

