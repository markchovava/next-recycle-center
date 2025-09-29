"use client"

import { useState } from "react"
import TextInputPrimary from "./TextInputPrimary"
import { toast } from "react-toastify"
import ButtonSubmit from "../buttons/ButtonSubmit"
import Heading2 from "../headings/Heading2"
import { AuthEntity } from "@/_data/entity/AuthEntity"




export default function FormRegister() {
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
            <Heading2 title="Register" />
            <p className="text-gray-500">Register an account</p>
        </div>
        <hr className="border-b border-gray-300 my-3" />
        <TextInputPrimary
            label="Email"
            name="email"
            value={data.email}
            placeholder="Enter your Email."
            onChange={handleInput}
        />
        <TextInputPrimary
            label="Password"
            name="password"
            type="password"
            value={data.password}
            placeholder="Enter your Password."
            onChange={handleInput}
        />
          <TextInputPrimary
            label="Confirm Password"
            name="passwordConfirm"
            type="password"
            value={data.passwordConfirm}
            placeholder="Enter your Password Confirmation."
            onChange={handleInput}
        />
       <ButtonSubmit isSubmit={data.isSubmit} title="Register" />

       <hr className="border-b border-gray-300 my-3" />

       <p className="text-center text-gray-500 mb-4">
           Already have an account? 
           <a href="/login" className="text-green-700 hover:underline ml-1">Login</a>
       </p>

    </form>
    </>
  )
}
