"use client"
import { useState } from 'react'
import SpacerSecondary from '../spacers/SpacerSecondary'
import TextInputSecondary from './TextInputSecondary'
import TextAreaSecondary from './TextAreaSecondary'
import ButtonSubmit from '../buttons/ButtonSubmit'
import Heading2 from '../headings/Heading2'
import { messageStoreAction } from '@/_actions/MessageActions'
import { MessageStatusData } from '@/_data/sample/MessageData'
import { toast } from 'react-toastify'
import { useMessageStore } from '@/_store/useMessageStore'



const ContactData = {
    name: "",
    message: "",
    email: "",
    isSubmit: false,
}

export default function FormContact() {
    const {
            data,  
            setInputValue, 
            errors,
            setError,
            clearErrors, 
            validateForm, 
            isSubmitting, 
            setIsSubmitting,
            getDataList,
            resetData,
        } = useMessageStore()
                       
        async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            // Clear previous errors
            clearErrors();
            // Validate form using store
            const validation = validateForm();
            if (!validation.isValid) {
                // Show the first error as toast
                const firstError = validation.errors.email || validation.errors.message;
                toast.warn(firstError);
                return;
            }
            setIsSubmitting(true);
            const formData = {
                name: data.name,
                email: data.email,
                title: data.title,
                message: data.message,
                status: MessageStatusData[0]
            }
            
            try {
                const res = await messageStoreAction(formData);
                if(res.status === 1){
                    toast.success(res.message);
                    await getDataList()
                    clearErrors();
                    resetData()
                    return
                }
            } catch (error) {
                toast.error('Failed to save data. Please try again.');
                console.error('Form submission error:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    

  return (
    <>
    <section style={{backgroundImage: `url(/assets/img/01.jpg)`}} 
            className="bg-fixed bg-cover bg-no-repeat relative h-[40rem]">
            <div className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-br from-green-600 to-green-950 opacity-60"></div>
            <div className="absolute z-15 top-0 left-0 w-full h-full flex items-center justify-center">
                <SpacerSecondary />
        
                <form onSubmit={handleSubmit} className="mx-auto lg:w-[60%] w-[90%] text-white flex flex-col gap-4">
                    <div className='flex items-center justify-center'>
                        <Heading2 title="Talk to us" />
                    </div>
                    <TextInputSecondary
                        label="Name:"
                        name="name"
                        type='text'
                        value={data.name}
                        placeholder="Enter your Name..."
                        onChange={setInputValue}
                    />
                    <TextInputSecondary
                        label="Email:"
                        name="email"
                        type='text'
                        value={data.email}
                        placeholder="Enter your Email..."
                        onChange={setInputValue}
                    />
                    <TextAreaSecondary
                        label="Message:"
                        name="message"
                        value={data.message}
                        placeholder="Enter your Message..."
                        onChange={setInputValue}
                    />
                    <div className='flex items-center justify-center'>
                        <ButtonSubmit isSubmit={isSubmitting} title="Login" />
                    </div>
                </form>
                <SpacerSecondary />
            </div>
        </section>
    </>
  )
}
