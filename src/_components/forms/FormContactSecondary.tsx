"use client"
import { useState } from 'react'
import TextInputPrimary from './TextInputPrimary'
import ButtonSubmit from '../buttons/ButtonSubmit'
import Heading2 from '../headings/Heading2'
import TextAreaPrimary from './TextAreaPrimary'
import { toast } from 'react-toastify'
import { ContactEntity } from '@/_data/entity/ContactEntity'




export default function FormContactSecondary() {
    const [data, setData] = useState(ContactEntity)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setData({ ...data, isSubmit: true }) 
        try {
            // Add your form submission logic here
            console.log('Form data:', data);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Data updated successfully!');
        } catch (error) {
            toast.error('Failed to update Data. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            setData({ ...data, isSubmit: false })
        }
    }


  return (
    <>
   <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 rounded-xl bg-white p-8 shadow-md">
        <div className="flex flex-col justify-center items-center gap-2">
            <Heading2 title="Talk to us" />
        </div>
        <hr className="border-b border-gray-300 my-3" />
        <TextInputPrimary
            label="Name:"
            name="name"
            value={data.name}
            placeholder="Enter your Name"
            onChange={handleInput}
        />
        <TextInputPrimary
            label="Email:"
            name="email"
            value={data.email}
            placeholder="Enter your Email"
            onChange={handleInput}
        />
        <TextAreaPrimary
            label="Message:"
            name="message"
            value={data.message}
            placeholder="Enter your Email"
            onChange={handleInput}
        />
        <div className='flex items-center justify-center'>
            <ButtonSubmit 
                isSubmit={data.isSubmit} 
                title="Submit" 
            />
        </div>

       

       

    </form>
    </>
  )
}
