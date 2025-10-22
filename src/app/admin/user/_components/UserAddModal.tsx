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
import SelectInputPrimary from '@/_components/forms/SelectInputPrimary';
import { useUserStore } from '@/_store/useUserStore';
import { _userStoreAction } from '@/_actions/UserActions';
import { RolesData } from '@/_data/sample/RolesData';
import ErrorPrimary from '@/_components/forms/ErrorPrimary';



const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1,
        transition: {
            type: 'spring', // The type must be a specific literal
            duration: 1,
        }},
}

interface UserAddModalInterface{
    isModal: boolean,
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}





export default function UserAddModal({
        isModal, 
        setIsModal
    }: UserAddModalInterface
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
        } = useUserStore()
       
        async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
                e.preventDefault();
                // Clear previous errors
                clearErrors();
                // Validate form using store
                const validation = validateForm();
                if (!validation.isValid) {
                    // Show the first error as toast
                    const firstError = validation.errors.name || validation.errors.phone ||
                        validation.errors.email || validation.errors.address;
                    toast.warn(firstError);
                    return;
                }
                setIsSubmitting(true);
                const formData = {
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    address: data.address,
                    roleLevel: data.roleLevel,
                    isAdmin: 0,

                }
                
                try {
                    const res = await _userStoreAction(formData);
                    if(res.status === 0){
                        toast.success(res.message);
                        setError("email", res.message)
                    }
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
                            <TitlePrimary title="Add User" />
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
                        <TextInputPrimary
                            label='Address:' 
                            name='address' 
                            type="text"
                            value={data.address} 
                            placeholder='Enter your Address...'
                            onChange={setInputValue} 
                        />
                        <div className='w-full'>
                            <SelectInputPrimary
                                label='Role:'
                                name='roleLevel'
                                value={data.roleLevel}
                                dbData={RolesData}
                                onChange={setInputValue}
                            />
                            <ErrorPrimary msg={errors.role} />
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
