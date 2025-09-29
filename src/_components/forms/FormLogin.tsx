"use client"

import { useState } from "react"
import TextInputPrimary from "./TextInputPrimary"
import { toast } from "react-toastify"
import ButtonSubmit from "../buttons/ButtonSubmit"
import Heading2 from "../headings/Heading2"
import { AuthEntity } from "@/_data/entity/AuthEntity"



export default function FormLogin() {
    const [data, setData] = useState(AuthEntity)
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
                toast.success('Profile updated successfully!');
            } catch (error) {
                toast.error('Failed to update profile. Please try again.');
                console.error('Form submission error:', error);
            } finally {
                setData({ ...data, isSubmit: false })
            }
    }


  return (
    <>
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 rounded-xl bg-white p-8 shadow-md">
        <div className="flex flex-col justify-center items-center gap-2">
            <Heading2 title="Login" />
            <p className="text-gray-500">Login to your account</p>
        </div>
        <hr className="border-b border-gray-300 my-3" />
        <TextInputPrimary
            label="Email"
            name="email"
            value={data.email}
            placeholder="Enter your email"
            onChange={handleInput}
        />
        <TextInputPrimary
            label="Password"
            name="password"
            type="password"
            value={data.password}
            placeholder="Enter your password"
            onChange={handleInput}
        />
       <ButtonSubmit isSubmit={data.isSubmit} title="Login" />

       <hr className="border-b border-gray-300 my-3" />

       <p className="text-center text-gray-500 mb-4">
           Don't have an account? 
           <a href="/register" className="text-green-700 hover:underline ml-1">Register</a>
       </p>

    </form>
    </>
  )
}
