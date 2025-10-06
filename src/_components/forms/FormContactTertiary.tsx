"use client"

import { ContactEntity } from "@/_data/entity/ContactEntity";
import { useState } from "react";
import { toast } from "react-toastify";
import TextInputPrimary from "./TextInputPrimary";
import TextAreaPrimary from "./TextAreaPrimary";
import ButtonSubmit from "../buttons/ButtonSubmit";

export default function FormContactTertiary() {
    const [data, setData] = useState(ContactEntity)
    
    const handleInput = (e: React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInputPrimary
            label="Name:"
            name="name"
            value={data.name}
            placeholder="Enter your Name..."
            onChange={handleInput}
        />
        <TextInputPrimary
            label="Email"
            name="email"
            value={data.email}
            placeholder="Enter your Email..."
            onChange={handleInput}
        />
        <TextAreaPrimary
            label="Message:"
            name="message"
            value={data.message}
            placeholder="Enter your Email"
            onChange={handleInput}
        />
        <div className='flex items-center justify-start'>
            <ButtonSubmit 
            isSubmit={data.isSubmit} 
            title="Submit" 
            />
        </div>
    </form>
  )
}
