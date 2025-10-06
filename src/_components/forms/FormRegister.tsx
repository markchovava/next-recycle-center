"use client"

import { useState } from "react"
import TextInputPrimary from "./TextInputPrimary"
import { toast } from "react-toastify"
import ButtonSubmit from "../buttons/ButtonSubmit"
import Heading2 from "../headings/Heading2"
import { AuthEntity } from "@/_data/entity/AuthEntity"
import { registerAction } from "@/_actions/AuthActions"
import { useRouter } from "next/navigation"



export default function FormRegister() {
    const router = useRouter()
    const [data, setData] = useState(AuthEntity)
    const [errMsg, setErrMsg] = useState(AuthEntity)
    
    const handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
        // Clear error for the field being edited
        if (errMsg[e.target.name as keyof typeof errMsg]) {
            setErrMsg({ ...errMsg, [e.target.name]: "" })
        }
    }



    function validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let errors = { ...AuthEntity }
        let hasError = false
        // Email validation
        if (!data.email) {
            errors.email = "Email is required."
            hasError = true
        } else if (!validateEmail(data.email)) {
            errors.email = "Please enter a valid email address."
            hasError = true
        }
        // Password validation
        if (!data.password) {
            errors.password = "Password is required."
            hasError = true
        }
        // Confirm password validation
        if (!data.passwordConfirm) {
            errors.passwordConfirm = "Confirm Password is required."
            hasError = true
        } else if (data.password !== data.passwordConfirm) {
            errors.passwordConfirm = "Passwords do not match."
            hasError = true
        }
        // If there are errors, display them and stop submission
        if (hasError) {
            setErrMsg(errors)
            // Show the first error as toast
            const firstError = errors.email || errors.password || errors.passwordConfirm
            toast.warn(firstError)
            return
        }
        // Proceed with form submission
        setData({ ...data, isSubmit: true })
        const formData = {
            email: data.email,
            password: data.password
        }
        try {
            // API call
            const res = await registerAction(formData)
            if(res.status === 0) {
                toast.warn(res.message)
                setErrMsg({...errMsg, email: res.message})
            
            }
            if(res.status === 1) {
                toast.success(res.message)
                router.push('/login')
            }
            // await new Promise(resolve => setTimeout(resolve, 1000))
            // toast.success('Registration successful!')
        } catch (error) {
            toast.error('Registration failed. Please try again.')
            console.error('Form submission error:', error)
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
                <div>
                    <TextInputPrimary
                        label="Email:"
                        name="email"
                        value={data.email}
                        placeholder="Enter your Email."
                        onChange={handleInput}
                    />
                    {errMsg.email &&
                        <p className="text-sm text-red-600">{errMsg.email}</p>
                    }
                </div>
                <div>
                    <TextInputPrimary
                        label="Password:"
                        name="password"
                        type="password"
                        value={data.password}
                        placeholder="Enter your Password."
                        onChange={handleInput}
                    />
                    {errMsg.password &&
                        <p className="text-sm text-red-600">{errMsg.password}</p>
                    }
                </div>
                <div>
                    <TextInputPrimary
                        label="Confirm Password:"
                        name="passwordConfirm"
                        type="password"
                        value={data.passwordConfirm}
                        placeholder="Enter your Password Confirmation."
                        onChange={handleInput}
                    />
                    {errMsg.passwordConfirm &&
                        <p className="text-sm text-red-600">{errMsg.passwordConfirm}</p>
                    }
                </div>
                <div className="flex items-center justify-center">
                    <ButtonSubmit 
                        isSubmit={data.isSubmit} 
                        title="Register" 
                    />
                </div>

                <hr className="border-b border-gray-300 my-3" />

                <p className="text-center text-gray-500 mb-4">
                    Already have an account? 
                    <a href="/login" className="text-green-700 hover:underline ml-1">Login</a>
                </p>
            </form>
        </>
    )
}