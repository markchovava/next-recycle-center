"use client"
import { useState } from 'react'
import TextInputPrimary from './TextInputPrimary'
import ButtonSubmit from '../buttons/ButtonSubmit'
import Heading2 from '../headings/Heading2'
import TextAreaPrimary from './TextAreaPrimary'
import { toast } from 'react-toastify'
import { ContactEntity } from '@/_data/entity/ContactEntity'
import { useMessageStore } from '@/_store/useMessageStore'
import { messageStoreAction } from '@/_actions/MessageActions'
import { MessageStatusData } from '@/_data/sample/MessageData'
import ErrorPrimary from './ErrorPrimary'




export default function FormContactSecondary() {
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
            const firstError = validation.errors.email || validation.errors.message ||
                validation.errors.title
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
            onChange={setInputValue}
        />
        <div className='w-full'>
        <TextInputPrimary
            label='Email:' 
            name='email' 
            type="email"
            value={data.email} 
            placeholder='Enter your Email...'
            onChange={setInputValue} 
        />
        <ErrorPrimary msg={errors.email} />
        </div>
        <div className='w-full'>
            <TextInputPrimary
                label='Title:' 
                name='title' 
                type="text"
                value={data.title} 
                placeholder='Enter your Title...'
                onChange={setInputValue} 
            />
            <ErrorPrimary msg={errors.title} />
        </div>

        <div className='w-full'>
            <TextAreaPrimary
                label='Message:' 
                name='message' 
                value={data.message} 
                placeholder='Enter your Message...'
                onChange={setInputValue} 
            />
            <ErrorPrimary msg={errors.message} />
        </div>
        <div className='flex items-center justify-center'>
            <ButtonSubmit 
                isSubmit={isSubmitting} 
                title="Submit" 
            />
        </div>

       

       

    </form>
    </>
  )
}
