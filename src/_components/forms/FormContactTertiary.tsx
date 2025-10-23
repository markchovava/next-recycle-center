"use client"

import { ContactEntity } from "@/_data/entity/ContactEntity";
import { useState } from "react";
import { toast } from "react-toastify";
import TextInputPrimary from "./TextInputPrimary";
import TextAreaPrimary from "./TextAreaPrimary";
import ButtonSubmit from "../buttons/ButtonSubmit";
import { MessageStatusData } from "@/_data/sample/MessageData";
import { messageStoreAction } from "@/_actions/MessageActions";
import { useMessageStore } from "@/_store/useMessageStore";




export default function FormContactTertiary({title}: {title: string}) {
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
            title: `Center: ${title}`,
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInputPrimary
            label="Name:"
            name="name"
            value={data.name}
            placeholder="Enter your Name..."
            onChange={setInputValue}
        />
        <TextInputPrimary
            label="Email"
            name="email"
            value={data.email}
            placeholder="Enter your Email..."
            onChange={setInputValue}
        />
        <TextAreaPrimary
            label="Message:"
            name="message"
            value={data.message}
            placeholder="Enter your Email"
            onChange={setInputValue}
        />
        <div className='flex items-center justify-start'>
            <ButtonSubmit 
            isSubmit={isSubmitting} 
            title="Submit" 
            />
        </div>
    </form>
  )
}
