"use client"

import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import TitlePrimary from '@/_components/titles/TitlePrimary';
import TextInputPrimary from '@/_components/forms/TextInputPrimary';
import ButtonSubmit from '@/_components/buttons/ButtonSubmit';
import TextAreaPrimary from '@/_components/forms/TextAreaPrimary';
import SelectInputPrimary from '@/_components/forms/SelectInputPrimary';
import { FaqEntity } from '@/_data/entity/FaqEntity';
import { PublishData } from '@/_data/sample/PublishData';
import { useGettingStartedStore } from '@/_store/useGettingStartedStore';
import { _gettingStartedStoreAction } from '@/_actions/GettingStartedActions';



const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1,
        transition: {
            type: 'spring', // The type must be a specific literal
            duration: 1,
        }},
}

interface FaqAddModalInterface{
    isModal: boolean,
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}



export default function FaqAddModal({
        isModal, 
        setIsModal
    }: FaqAddModalInterface
) {
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
        } = useGettingStartedStore()
               
        async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            // Clear previous errors
            clearErrors();
            // Validate form using store
            const validation = validateForm();
            if (!validation.isValid) {
                // Show the first error as toast
                const firstError = validation.errors.title || validation.errors.content;
                toast.warn(firstError);
                return;
            }
            setIsSubmitting(true);
            const formData = {
                title: data.title,
                content: data.content,
            }
            
            try {
                const res = await _gettingStartedStoreAction(formData);
                if(res.status === 1){
                    toast.success(res.message);
                    await getDataList()
                    clearErrors();
                    resetData()
                    setIsModal(false);
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
        <AnimatePresence>
            {isModal &&
            <motion.section
                variants={variants}
                initial='hidden'
                animate='visible'
                exit='hidden'
                className='w-[100vw] h-[100vh] fixed top-0 left-0 z-[200] overflow-y-auto' >
                <div className='absolute z-0 top-0 left-0 w-[100%] h-[100%] bg-black opacity-40'></div>
                <div className='w-[100%] h-[100%] absolute z-10 overflow-auto scroll__width py-[6rem]'>
                <section className='mx-auto lg:w-[50%] w-[90%] bg-white text-black p-6 rounded-2xl'>
                    <div className='flex items-center justify-end'>
                        <button onClick={() => setIsModal(false)} className='hover:text-red-600 transition-all ease-in-out duration-200'>
                            <IoClose className='text-3xl' />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className='flex flex-col items-start justify-center gap-4'>
                        <div className='w-full'>
                            <TitlePrimary title="Add FAQ" />
                        </div>
                        <TextInputPrimary
                            label='Question:' 
                            name='title' 
                            type="text"
                            value={data.title} 
                            placeholder='Enter your Title...'
                            onChange={setInputValue} 
                        />
                        <TextAreaPrimary
                            label='Answer:' 
                            name='content' 
                            value={data.content} 
                            placeholder='Enter your Details...'
                            onChange={setInputValue} 
                        />
                        <div className='w-full flex items-center justify-center pt-1'>
                            <ButtonSubmit 
                                title='Submit' 
                                isSubmit={isSubmitting} 
                            />
                        </div>
                    </form>

                </section>
                </div>
            </motion.section>
            }
        </AnimatePresence>
        </>
    )

}
