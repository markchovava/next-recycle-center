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
import { NewsEntity } from '@/_data/entity/NewsEntity';
import { PublishData } from '@/_data/sample/PublishData';
import ImageInputPrimary from '@/_components/forms/ImageInputPrimary';
import { useUserStore } from '@/_store/useUserStore';
import { useNewsStore } from '@/_store/useNewsStore';
import { _newsStoreAction, _newsUpdateAction } from '@/_actions/NewsActions';
import { NewsStatusData } from '@/_data/sample/NewsData';
import SelectInputSecondary from '@/_components/forms/SelectInputSecondary';
import { PriorityData } from '@/_data/sample/PriorityData';



const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1,
        transition: {
            type: 'spring',
            duration: 1,
        }},
}

interface UserAddModalInterface{
    id: string | number,
    isModal: boolean,
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}



export default function UserEditModal({
        id,
        isModal, 
        setIsModal
    }: UserAddModalInterface
) {
    const {
        data,  
        setInputValue, 
        errors,
        clearErrors, 
        validateForm, 
        isSubmitting, 
        setIsSubmitting,
        getData,
        setNewImageFile
    } = useNewsStore()

    

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        
        // Clear previous errors
        clearErrors();
        
        // Validate form using store
        const validation = validateForm();
        console.log("Validation result:", validation);
        
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.title || validation.errors.content ||
                validation.errors.priority || validation.errors.status;
            toast.warn(firstError || "Please fill in all required fields");
            console.log("Validation failed:", validation.errors);
            return;
        }
        
        setIsSubmitting(true);
        console.log("Creating FormData...");
        
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("content", data.content);
            formData.append("status", data.status);
            formData.append("priority", String(data.priority));
             if (data.newImage && data.newImage instanceof File) {
                formData.append("image", data.newImage);
            }
            
            console.log("Submitting to API...");
            const res = await _newsUpdateAction(id, formData);
            console.log("API Response:", res);
            
            if(res.status === 1){
                await getData(id);
                clearErrors();
                setIsModal(false);
            } else {
                toast.error(res.message || "Failed to save data");
            }
        } catch (error) {
            toast.error('Failed to save data. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
            console.log("Submission complete");
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
                <div 
                    className='absolute z-0 top-0 left-0 w-[100%] h-[100%] bg-black opacity-40'
                    onClick={() => setIsModal(false)}
                ></div>
                <div className='w-[100%] h-[100%] absolute z-10 overflow-auto scroll__width py-[6rem]'>
                <section 
                    className='mx-auto lg:w-[50%] w-[90%] bg-white text-black p-6 rounded-2xl'
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='flex items-center justify-end'>
                        <button 
                            type="button"
                            onClick={() => setIsModal(false)} 
                            className='hover:text-red-600 transition-all ease-in-out duration-200'
                        >
                            <IoClose className='text-3xl' />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className='flex flex-col items-start justify-center gap-4'>
                        <div className='w-full'>
                            <TitlePrimary title="Edit News" />
                        </div>
                        <div className='flex items-center justify-center'>
                             <ImageInputPrimary
                                image={data.imageURL ?? ""}
                                onImageChange={setNewImageFile}
                                maxSize={5 * 1024 * 1024} // 5MB
                                acceptedFormats={['image/jpeg', 'image/jpg', 'image/png', 'image/gif']}
                                                        />
                        </div>
                        <TextInputPrimary
                            label='Title:' 
                            name='title' 
                            type="text"
                            value={data.title} 
                            placeholder='Enter your Title...'
                            onChange={setInputValue} 
                        />
                        <TextAreaPrimary
                            label='Content:' 
                            name='content' 
                            value={data.content} 
                            placeholder='Enter your Content...'
                            onChange={setInputValue} 
                        />
                        <div className='w-full grid md:grid-cols-2 grid-cols-1 gap-4'>
                            <div className='w-full'>
                                <SelectInputSecondary
                                    label='Status:'
                                    name='status'
                                    value={data.status}
                                    dbData={NewsStatusData}
                                    onChange={setInputValue}
                                />
                            </div>
                            <div className='w-full'>
                                 <SelectInputSecondary
                                    label='Priority:'
                                    name='priority'
                                    value={data.priority}
                                    dbData={PriorityData}
                                    onChange={setInputValue}
                                />
                            </div>
                        </div>
                        
                       
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