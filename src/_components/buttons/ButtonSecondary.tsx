"use client"


interface ButtonSecondaryProps {
    title: string,
    css?: string,
    onClick?: () => void
}
export default function ButtonSecondary({ 
        title = "Button", 
        css = 'py-2 px-4',
        onClick= () => {}
    }: ButtonSecondaryProps
) {

  return (
    <button 
    onClick={onClick} 
    className={`${css} hover:drop-shadow-xl bg-white hover:bg-gray-100 cursor-pointer text-green-800 rounded-lg ease-initial duration-200 transition-all `}>
        {title}
    </button>
  )
}
