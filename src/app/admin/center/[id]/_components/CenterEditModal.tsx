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
import { CenterEntity } from '@/_data/entity/CenterEntity';
import { CenterInterface } from '@/_data/interface/CenterInterface';


// --- Initial State for CenterInterface ---
// Assuming a new/empty center for an 'Add' or a default state for 'Edit'
// Note: When used for editing, 'initialData' should be passed via props.


// --- Framer Motion Variants (Unchanged) ---
const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1,
        transition: {
            type: 'spring',
            duration: 1,
        }},
};

// --- Interface for Modal Props (Renamed to CenterEditModalInterface) ---
interface CenterEditModalInterface {
    isModal: boolean;
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
    initialData?: CenterInterface; // Optional prop to pass existing center data for editing
}

// --- Refactored Component (Renamed to CenterEditModal) ---
export default function CenterEditModal({
    isModal,
    setIsModal,
    initialData = CenterEntity, // Use prop if provided, otherwise use default
}: CenterEditModalInterface) {
    // Use the new CenterInterface for the state
    const [data, setData] = useState<CenterInterface>(initialData);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    // Ensure the state updates for number inputs convert the value back to a number
    const handleInput = (e: React.ChangeEvent<HTMLInputElement> |
        React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        let newValue: string | number = value;

        // Simple type conversion for known number fields (like longitude, latitude)
        if (type === 'number') {
             // Use parseFloat to handle decimal numbers
            newValue = parseFloat(value) || 0;
        }

        setData({ ...data, [name]: newValue });
    };


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmit(true);
        try {
            // Add your form submission logic here (e.g., API call to save center data)
            console.log('Form data:', data);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // You might want to change 'Profile updated' to 'Center data updated'
            toast.success('Center data updated successfully!');
            setIsModal(false);
        } catch (error) {
            toast.error('Failed to update center data. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            setIsSubmit(false);
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
                            {/* Title changed from 'Edit Profile' to 'Edit Center' */}
                            <TitlePrimary title="Edit Center" />
                        </div>
                        
                        {/* --- Contact Information --- */}
                        <TitleSecondary title="Contact Details" />
                        <TextInputPrimary
                            label='Center Name:'
                            name='name'
                            type="text"
                            value={data.name}
                            placeholder='Enter Center Name...'
                            onChange={handleInput}
                        />
                        <TextInputPrimary
                            label='Phone:'
                            name='phone'
                            type="tel"
                            value={data.phone}
                            placeholder='Enter Phone Number...'
                            onChange={handleInput}
                        />
                        <TextInputPrimary
                            label='Email:'
                            name='email'
                            type="email"
                            value={data.email}
                            placeholder='Enter Email...'
                            onChange={handleInput}
                        />

                        {/* --- Location Details --- */}
                        <TitleSecondary title="Location Details" />
                        <TextAreaPrimary
                            label='Address:'
                            name='address'
                            value={data.address}
                            placeholder='Enter Street Address...'
                            onChange={handleInput}
                        />
                        <div className='grid grid-cols-2 gap-4 w-full'>
                            <TextInputPrimary
                                label='City:'
                                name='city'
                                type="text"
                                value={data.city}
                                placeholder='Enter City...'
                                onChange={handleInput}
                            />
                            <TextInputPrimary
                                label='Province:'
                                name='province'
                                type="text"
                                value={data.province}
                                placeholder='Enter Province/State...'
                                onChange={handleInput}
                            />
                        </div>
                        <div className='grid grid-cols-3 gap-4 w-full'>
                            <TextInputPrimary
                                label='Postal Code:'
                                name='postalCode'
                                type="text"
                                value={data.postalCode}
                                placeholder='Enter Postal Code...'
                                onChange={handleInput}
                            />
                             <TextInputPrimary
                                label='Latitude:'
                                name='latitude'
                                type="number"
                                value={data.latitude}
                                placeholder='Latitude'
                                onChange={handleInput}
                            />
                            <TextInputPrimary
                                label='Longitude:'
                                name='longitude'
                                type="number"
                                value={data.longitude}
                                placeholder='Longitude'
                                onChange={handleInput}
                            />
                        </div>

                        {/* --- Operational Details --- */}
                         <TitleSecondary title="Operational Details" />
                         <TextAreaPrimary
                            label='Description:'
                            name='description'
                            value={data.description}
                            placeholder='Enter a detailed description of the center and its services...'
                            onChange={handleInput}
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
                                onChange={handleInput}
                            />
                             <TextInputPrimary
                                label='Weekday Close Time:'
                                name='weekdayCloseTime'
                                type="time"
                                placeholder=''
                                value={data.weekdayCloseTime}
                                onChange={handleInput}
                            />
                            <TextInputPrimary
                                label='Weekend Open Time:'
                                name='weekendOpenTime'
                                type="time"
                                placeholder=''
                                value={data.weekendOpenTime}
                                onChange={handleInput}
                            />
                             <TextInputPrimary
                                label='Weekend Close Time:'
                                name='weekendCloseTime'
                                type="time"
                                placeholder=''
                                value={data.weekendCloseTime}
                                onChange={handleInput}
                            />
                             <TextInputPrimary
                                label='Holiday Open Time:'
                                name='holidayOpenTime'
                                type="time"
                                placeholder=''
                                value={data.holidayOpenTime}
                                onChange={handleInput}
                            />
                             <TextInputPrimary
                                label='Holiday Close Time:'
                                name='holidayCloseTime'
                                placeholder=''
                                type="time"
                                value={data.holidayCloseTime}
                                onChange={handleInput}
                            />
                        </div>

                        {/* Note: SelectInputPrimary for 'Publish' was removed as it's not in CenterInterface.
                           If needed, you can re-add it with a relevant field from the interface or a new one. */}

                        <div className='w-full flex items-center justify-center pt-1'>
                            <ButtonSubmit
                                title='Save Center'
                                isSubmit={isSubmit}
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