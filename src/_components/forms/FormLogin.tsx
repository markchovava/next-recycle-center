"use client"

import { useState } from "react"
import TextInputPrimary from "./TextInputPrimary"
import { toast } from "react-toastify"
import ButtonSubmit from "../buttons/ButtonSubmit"
import Heading2 from "../headings/Heading2"
import { AuthEntity } from "@/_data/entity/AuthEntity"
import { loginAction } from "@/_actions/AuthActions"
import { useRouter } from "next/navigation"
import { AuthTokenCookieName, setTheCookie, UserCookieName } from "@/_cookies/CookiesClient"



export default function FormLogin() {
    const router = useRouter()
    const [data, setData] = useState(AuthEntity)
    const [errMsg, setErrMsg] = useState(AuthEntity)
    const handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
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
        // If there are errors, display them and stop submission
        if (hasError) {
            setErrMsg(errors)
            // Show the first error as toast
            const firstError = errors.email || errors.password
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
            //  API call
            const res = await loginAction(formData)
            console.log('res::: ', res)
            if(res.status === 0) {
                toast.warn(res.message)
                setErrMsg({...errMsg, email: res.message})
            }
            if(res.status === 2) {
                toast.warn(res.message)
                setErrMsg({...errMsg, password: res.message})
            }
            if(res.status === 1) {
                setTheCookie(AuthTokenCookieName, res.authToken)
                setTheCookie(UserCookieName, JSON.stringify(res.data))
                toast.success(res.message)
                router.push('/admin')
            }
            //  Simulate API call
            //  await new Promise(resolve => setTimeout(resolve, 1000));
            //  toast.success('Profile updated successfully!');
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
