import React from 'react'
import { GoDotFill } from 'react-icons/go'
import { IoSearch } from 'react-icons/io5'

interface FormSearchInterface{
    handleSearch: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    value: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isSearch: boolean,
    placeholder: string,
    css?: string

}

export default function FormSearch({
    handleSearch, 
    value, 
    onChange, 
    isSearch, 
    name,
    css="lg:w-[60%] w-full rounded-lg px-3 py-2",
    placeholder="Enter Name here..."
}: FormSearchInterface
) {
  return (
    <form onSubmit={handleSearch} className={`${css} overflow-hidden flex items-center justify-start border border-gray-300`}>
        <input 
        type="text" 
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 py-2 px-4 outline-none rounded-l-full" 
        />
        <button type="submit" className="group px-6 py-2 border-l border-gray-300 rounded-r-full">
        {isSearch ? 
            <GoDotFill className="cursor-pointer text-2xl animate-pulse text-gray-900" />
        :
            <IoSearch className="cursor-pointer text-xl text-gray-500 transition-all ease-initial duration-200 group-hover:text-gray-900 group-hover:scale-110" />
        }
        </button>
    </form>
  )
}
