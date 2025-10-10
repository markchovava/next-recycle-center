"use client";

import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import TitlePrimary from '@/_components/titles/TitlePrimary';
import TextInputPrimary from '@/_components/forms/TextInputPrimary';
import ButtonSubmit from '@/_components/buttons/ButtonSubmit';
import TextAreaPrimary from '@/_components/forms/TextAreaPrimary';
import TitleSecondary from '@/_components/titles/TitleSecondary';
import { CenterEntity, CenterInterface } from '@/_data/entity/CenterEntity';
import { useAuthStore } from '@/_store/useAuthStore';
import { useCenterStore } from '@/_store/useCenterStore';
import ImageInputPrimary from '@/_components/forms/ImageInputPrimary';
import ErrorPrimary from '@/_components/forms/ErrorPrimary';
import SelectInputSecondary from '@/_components/forms/SelectInputSecondary';
import { ProvincesData } from '@/_data/sample/ProvinceData';
import { CityData } from '@/_data/sample/CityData';
import { _centerUpdateAction, centerViewAction } from '@/_actions/CenterActions';
import { BaseURL } from '@/_api/BaseURL';

// --- Framer Motion Variants (Unchanged) ---
const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1,
        transition: {
            type: 'spring',
            duration: 1,
        }},
};


interface CenterEditModalInterface {
    id: number | string,
    isModal: boolean;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// --- Refactored Component (Renamed to CenterEditModal) ---
export default function CenterEditModal({
    id,
    isModal,
    setIsModal,
}: CenterEditModalInterface) {
    // Use the new CenterInterface for the state
    const { 
        data, 
        errors, 
        setInputValue, 
        validateForm, 
        clearErrors,  
        setNewImageFile,
        setIsSubmitting,
        isSubmitting,
        setData,
        getData,
        setImage,
    } = useCenterStore()


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validate form using store
        const validation = validateForm();
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.name || validation.errors.phone ||
                validation.errors.email || validation.errors.address || validation.errors.city || 
                validation.errors.province || validation.errors.description;
            toast.warn(firstError);
            return;
        }
        
        setIsSubmitting(true);

        console.log('Form data before submission:', data);
        console.log('New image file:', data.newImage);

        try {
            const formData = new FormData(); // Fixed: Added parentheses
            
            formData.append("name", data.name);
            formData.append("phone", data.phone);
            formData.append("email", data.email);
            formData.append("address", data.address);
            formData.append("longitude", data.longitude);
            formData.append("latitude", data.latitude);
            formData.append("postalCode", data.postalCode ?? "");
            formData.append("city", data.city);
            formData.append("province", data.province);
            formData.append("description", data.description);
            formData.append("weekdayOpenTime", data.weekdayOpenTime);
            formData.append("weekdayCloseTime", data.weekdayCloseTime);
            formData.append("weekendOpenTime", data.weekendOpenTime);
            formData.append("weekendCloseTime", data.weekendCloseTime);
            formData.append("holidayOpenTime", data.holidayOpenTime);
            formData.append("holidayCloseTime", data.holidayCloseTime);
            // Only append image if it exists and is a valid File object
            if (data.newImage && data.newImage instanceof File) {
                formData.append("image", data.newImage);
            }
            
            // Debug: Log FormData contents
            console.log('FormData entries:');
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            
            const res = await _centerUpdateAction(id, formData);
            
            if (res.status === 1) {
                toast.success(res.message);
                const dbData = await centerViewAction(id);
                
                if (dbData.data) {
                    setData(dbData.data);
                    const img = dbData.data.image ? (BaseURL + dbData.data.image) : "";
                    if (img) {
                        setImage(img);
                    }
                    clearErrors();
                    setIsModal(false);
                } else {
                    toast.error('Failed to load updated data. Please refresh the page.');
                }
            } else {
                toast.error(res.message || 'Failed to update center. Please try again.');
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
                <section className='mx-auto lg:w-[60%] w-[90%] bg-white text-black p-6 rounded-2xl'>
                    <div className='flex items-center justify-end'>
                        <button onClick={() => setIsModal(false)} className='hover:text-red-600 transition-all ease-in-out duration-200'>
                            <IoClose className='text-3xl' />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className='w-full flex flex-col items-start justify-center gap-4'>
                        <div className='w-full'>
                            <TitlePrimary title="Edit Center" />
                        </div>
                        
                        {/* --- Contact Information --- */}
                        <TitleSecondary title="Contact Details" />
                        <div className='flex items-center justify-center w-[50%]'>
                            <ImageInputPrimary
                                image={data.imageURL ?? ""}
                                onImageChange={setNewImageFile}
                                maxSize={5 * 1024 * 1024} // 5MB
                                acceptedFormats={['image/jpeg', 'image/jpg', 'image/png', 'image/gif']}
                            />
                        </div>
                        <div className='w-full'>
                            <TextInputPrimary
                                label='Center Name:'
                                name='name'
                                type="text"
                                value={data.name}
                                placeholder='Enter Center Name...'
                                onChange={setInputValue}
                            />
                            <ErrorPrimary msg={errors.name} />
                        </div>
                        <div className='w-full'>
                            <TextInputPrimary
                                label='Phone:'
                                name='phone'
                                type="tel"
                                value={data.phone}
                                placeholder='Enter Phone Number...'
                                onChange={setInputValue}
                            />
                            <ErrorPrimary msg={errors.phone} />
                        </div>
                        <div className='w-full'>
                            <TextInputPrimary
                                label='Email:'
                                name='email'
                                type="email"
                                value={data.email}
                                placeholder='Enter Email...'
                                onChange={setInputValue}
                            />
                            <ErrorPrimary msg={errors.email} />
                        </div>

                        {/* --- Location Details --- */}
                        <TitleSecondary title="Location Details" />
                        <div className='w-full'>
                            <TextAreaPrimary
                                label='Address:'
                                name='address'
                                value={data.address}
                                placeholder='Enter Street Address...'
                                onChange={setInputValue}
                            />
                            <ErrorPrimary msg={errors.address} />
                        </div>
                        <div className='grid grid-cols-2 gap-4 w-full'>
                            <div className='w-full'>
                                <SelectInputSecondary
                                    label='City:'
                                    name='city'
                                    dbData={CityData}
                                    value={data.city}
                                    onChange={setInputValue}
                                />
                                <ErrorPrimary msg={errors.city} />
                            </div>
                            <div className='w-full'>
                                <SelectInputSecondary
                                    label='Province:'
                                    name='province'
                                    dbData={ProvincesData}
                                    value={data.province}
                                    onChange={setInputValue}
                                />
                                <ErrorPrimary msg={errors.province} />
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-4 w-full'>
                            <TextInputPrimary
                                label='Postal Code:'
                                name='postalCode'
                                type="text"
                                value={data.postalCode}
                                placeholder='Enter Postal Code...'
                                onChange={setInputValue}
                            />
                                <TextInputPrimary
                                label='Latitude:'
                                name='latitude'
                                type="number"
                                value={data.latitude ?? ""}
                                placeholder='Latitude'
                                onChange={setInputValue}
                            />
                            <TextInputPrimary
                                label='Longitude:'
                                name='longitude'
                                type="number"
                                value={data.longitude}
                                placeholder='Longitude'
                                onChange={setInputValue}
                            />
                        </div>

                        {/* --- Operational Details --- */}
                        <TitleSecondary title="Operational Details" />
                        <TextAreaPrimary
                        label='Description:'
                        name='description'
                        value={data.description}
                        placeholder='Enter a detailed description of the center and its services...'
                        onChange={setInputValue}
                        />

                        {/* --- Operating Hours --- */}
                        <TitleSecondary title="Operating Hours" />
                        <div className='grid grid-cols-2 gap-4 w-full'>
                            <TextInputPrimary
                                label='Weekday Open Time:'
                                name='weekdayOpenTime'
                                placeholder=''
                                type="time"
                                value={data.weekdayOpenTime}
                                onChange={setInputValue}
                            />
                                <TextInputPrimary
                                label='Weekday Close Time:'
                                name='weekdayCloseTime'
                                type="time"
                                placeholder=''
                                value={data.weekdayCloseTime}
                                onChange={setInputValue}
                            />
                            <TextInputPrimary
                                label='Weekend Open Time:'
                                name='weekendOpenTime'
                                type="time"
                                placeholder=''
                                value={data.weekendOpenTime}
                                onChange={setInputValue}
                            />
                                <TextInputPrimary
                                label='Weekend Close Time:'
                                name='weekendCloseTime'
                                type="time"
                                placeholder=''
                                value={data.weekendCloseTime}
                                onChange={setInputValue}
                            />
                                <TextInputPrimary
                                label='Holiday Open Time:'
                                name='holidayOpenTime'
                                type="time"
                                placeholder=''
                                value={data.holidayOpenTime}
                                onChange={setInputValue}
                            />
                                <TextInputPrimary
                                label='Holiday Close Time:'
                                name='holidayCloseTime'
                                placeholder=''
                                type="time"
                                value={data.holidayCloseTime}
                                onChange={setInputValue}
                            />
                        </div>

                        <div className='w-full flex items-center justify-center pt-1'>
                            <ButtonSubmit
                                title='Save Center'
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
    );
}