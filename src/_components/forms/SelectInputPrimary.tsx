"use client"

interface TextInputPrimaryProps {
    type?: string,
    label?: string
    name: string,
    value: string | number,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}




export default function SelectInputPrimary({
  type="text", 
  label, 
  name, 
  value, 
  onChange
}: TextInputPrimaryProps
) {

  return (
    <div className='w-full'>
        <p className='mb-1 font-light'>{label}:</p>
        <select 
            value={value} 
            name={name}
            onChange={onChange}
            className='w-full px-3 py-2 rounded-lg outline-none border border-gray-300 focus:border-gray-500 ease-initial duration-200 transition-all'>
                <option value="" disabled>Select an option</option>
                <option value="Yes" disabled>Yes</option>
                <option value="No" disabled>No</option>
            </select>
    </div>
  )
}