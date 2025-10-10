"use client"

import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import Heading2 from '@/_components/headings/Heading2';
import SpacerTertiary from '@/_components/spacers/SpacerTertiary';
import TitlePrimary from '@/_components/titles/TitlePrimary';
import TextInputPrimary from '@/_components/forms/TextInputPrimary';
import ButtonSubmit from '@/_components/buttons/ButtonSubmit';
import TextAreaPrimary from '@/_components/forms/TextAreaPrimary';
import { useAppInfoStore } from '@/_store/useAppInfoStore';
import { _appInfoStoreAction, appInfoViewAction } from '@/_actions/AppInfoActions';
import ErrorPrimary from '@/_components/forms/ErrorPrimary';



const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1,
        transition: {
            type: 'spring', // The type must be a specific literal
            duration: 1,
        }},
}

interface AppEditEditModalInterface{
    isModal: boolean,
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}


interface AppInfoInterface{
    id: number,
    name: string,
    phone: string,
    email: string,
    address: string,
    description: string,
    instagram: string,
    whatsapp: string,
    tiktok: string,
    linkedin: string,
    twitter: string,
    facebook: string,
}



const AppInfoEntity = {
    id: 0, 
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    instagram: "",
    whatsapp: "",
    tiktok: "",
    linkedin: "",
    twitter: "",
    facebook: "",
}

export default function AppInfoEditModal({
        isModal, 
        setIsModal
    }: AppEditEditModalInterface
) {
    const {
        setData, 
        getData,
        setInputValue, 
        data, 
        isSubmitting, 
        setIsSubmitting, 
        errors, 
        clearErrors,
        validateForm
    } = useAppInfoStore()
    
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // Clear previous errors
        clearErrors();
        // Validate form using store
        const validation = validateForm();
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.name || validation.errors.phone ||
                validation.errors.email || validation.errors.address
            toast.warn(firstError);
            return;
        }
        setIsSubmitting(true);
        const formData = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            description: data.description,
            website: data.website,
            facebook: data.facebook,
            tiktok: data.twitter,
            instagram: data.instagram,
            whatsapp: data.whatsapp,
            twitter: data.twitter,
        }
        try {
            const res = await _appInfoStoreAction(formData);
            if (res.status === 1) {
                toast.success(res.message);
                await getData();
                clearErrors();
                setIsModal(false);
            } else {
                toast.error(res.message || 'Failed to update. Please try again.');
                console.error('Server response:', res);
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
                            <TitlePrimary title="Edit App Information" />
                        </div>
                        <div className='w-full'>
                            <TextInputPrimary
                                label='Name:' 
                                name='name' 
                                type="text"
                                value={data.name} 
                                placeholder='Enter your Name...'
                                onChange={setInputValue} 
                            />
                            <ErrorPrimary msg={errors.name} />
                        </div>
                        <TextAreaPrimary
                            label='Description:' 
                            name='description' 
                            value={data.description} 
                            placeholder='Enter your Description...'
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
                                label='Phone Number:' 
                                name='phone' 
                                type="text"
                                value={data.phone} 
                                placeholder='Enter your Phone Number...'
                                onChange={setInputValue} 
                            />
                            <ErrorPrimary msg={errors.phone} />
                        </div>
                         <div className='w-full'>
                            <TextInputPrimary
                                label='Address:' 
                                name='address' 
                                type="text"
                                value={data.address} 
                                placeholder='Enter your Address...'
                                onChange={setInputValue} 
                            />
                            <ErrorPrimary msg={errors.address} />
                        </div>
                        <div className='w-full'>
                            <TextInputPrimary
                                label='WhatsApp:' 
                                name='whatsapp' 
                                type="text"
                                value={data.whatsapp} 
                                placeholder='Enter your WhatsApp URL...'
                                onChange={setInputValue} 
                            />
                        </div>
                       
                        <TextInputPrimary
                            label='Twitter:' 
                            name='twitter' 
                            type="text"
                            value={data.twitter} 
                            placeholder='Enter your Twitter URL...'
                            onChange={setInputValue} 
                        />
                         <TextInputPrimary
                            label='Tiktok:' 
                            name='tiktok' 
                            type="text"
                            value={data.tiktok} 
                            placeholder='Enter your Tiktok URL...'
                            onChange={setInputValue} 
                        />
                        <TextInputPrimary
                            label='Facebook:' 
                            name='facebook' 
                            type="text"
                            value={data.facebook} 
                            placeholder='Enter your Facebook URL...'
                            onChange={setInputValue} 
                        />
                        <TextInputPrimary
                            label='Instagram:' 
                            name='instagram' 
                            type="text"
                            value={data.instagram} 
                            placeholder='Enter your Instagram URL...'
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
