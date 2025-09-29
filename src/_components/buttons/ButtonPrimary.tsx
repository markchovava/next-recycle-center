"use client"


interface ButtonPrimaryProps {
    title: string,
    css?: string,
    onClick?: () => void
}
export default function ButtonPrimary({ 
        title = "Button", 
        css = 'py-2 px-4',
        onClick= () => {}
    }: ButtonPrimaryProps
) {

  return (
    <button 
    onClick={onClick} 
    className={`${css} bg-green-700 hover:bg-green-800 cursor-pointer text-white rounded-lg ease-initial duration-200 transition-all `}>
        {title}
    </button>
  )
}
