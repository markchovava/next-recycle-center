"use client"

interface TextInputPrimaryProps {
    type?: string,
    label?: string
    name: string,
    value: string | number,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    dbData: any[]
}




export default function SelectInputPrimary({
  label, 
  name, 
  value, 
  onChange, 
  dbData
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
                {dbData.map((i, key) => (
                    <option key={key} value={i.value}>{i.label}</option>
                ))}
               
            </select>
    </div>
  )
}