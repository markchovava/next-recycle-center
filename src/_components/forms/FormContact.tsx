"use client"
import { useState } from 'react'
import SpacerSecondary from '../spacers/SpacerSecondary'
import TextInputSecondary from './TextInputSecondary'
import TextAreaSecondary from './TextAreaSecondary'
import ButtonSubmit from '../buttons/ButtonSubmit'
import Heading2 from '../headings/Heading2'



const ContactData = {
    name: "",
    message: "",
    email: "",
    isSubmit: false,
}

export default function FormContact() {
    const [data, setData] = useState(ContactData)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


  return (
    <>
    <section style={{backgroundImage: `url(/assets/img/01.jpg)`}} 
            className="bg-fixed bg-cover bg-no-repeat relative h-[40rem]">
            <div className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-br from-green-600 to-green-950 opacity-60"></div>
            <div className="absolute z-15 top-0 left-0 w-full h-full flex items-center justify-center">
                <SpacerSecondary />
        
                <div className="mx-auto lg:w-[60%] w-[90%] text-white flex flex-col gap-4">
                    <div className='flex items-center justify-center'>
                        <Heading2 title="Talk to us" />
                    </div>
                    <TextInputSecondary
                        label="Name:"
                        name="name"
                        type='text'
                        value={data.name}
                        placeholder="Enter your Name..."
                        onChange={handleInput}
                    />
                    <TextInputSecondary
                        label="Email:"
                        name="email"
                        type='text'
                        value={data.email}
                        placeholder="Enter your Email..."
                        onChange={handleInput}
                    />
                    <TextAreaSecondary
                        label="Message:"
                        name="message"
                        value={data.message}
                        placeholder="Enter your Message..."
                        onChange={handleInput}
                    />
                    <div className='flex items-center justify-center'>
                        <ButtonSubmit isSubmit={data.isSubmit} title="Login" />
                    </div>
                </div>
                <SpacerSecondary />
            </div>
        </section>
    </>
  )
}
