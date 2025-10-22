"use client"

import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import TitlePrimary from '@/_components/titles/TitlePrimary';
import TextInputPrimary from '@/_components/forms/TextInputPrimary';
import ButtonSubmit from '@/_components/buttons/ButtonSubmit';
import TextAreaPrimary from '@/_components/forms/TextAreaPrimary';
import SelectInputPrimary from '@/_components/forms/SelectInputPrimary';
import { ScheduleEntity } from '@/_data/entity/ScheduleEntity';
import { PublishData } from '@/_data/sample/PublishData';
import { CenterData } from '@/_data/sample/CenterData';
import SelectInputSecondary from '@/_components/forms/SelectInputSecondary';
import { ScheduleCustomerStatusData } from '@/_data/sample/ScheduleData';
import { useScheduleStore } from '@/_store/useScheduleStore';
import ErrorPrimary from '@/_components/forms/ErrorPrimary';
import ButtonClose from '@/_components/buttons/ButtonClose';
import { _scheduleOfCustomerStoreAction } from '@/_actions/ScheduleActions';



const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1,
        transition: {
            type: 'spring',
            duration: 1,
        }},
}

interface ScheduleAddModalInterface{
    centerData: any[],
    isModal: boolean,
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}



export default function MyCustomerScheduleAddModal({
        centerData,
        isModal, 
        setIsModal
    }: ScheduleAddModalInterface
) {
    const { data, 
        setData, 
        setIsSubmitting, 
        isSubmitting, 
        setInputValue,
        resetData,
        validateCustomerForm,
        errors,
        setError,
        getScheduleOfCustomerDataList
    } = useScheduleStore()
    const [centerList, setCenterList] = useState(
        centerData.length > 0 
            ?   centerData.map(i => ({
                name: i.name, 
                value: i.id, 
                id: i.id, 
                phone: i.phone, 
                address: i.address})) 
            : []
    )


    useEffect(() => {
      resetData()
    }, [])

   

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const validation = validateCustomerForm();
        if (!validation.isValid) {
            const firstError = validation.errors.requestDate ||
                validation.errors.requestTime ||
                validation.errors.centerId || 
                validation.errors.customerName || 
                validation.errors.customerPhone ||
                validation.errors.customerAddress;
            toast.warn(firstError);
            return;
        }
        const centerId = Number(data.centerId)
        let centerName = ""
        let centerPhone = ""
        let centerAddress = ""
        if(centerData.length > 0) {
            const center = centerData.find(i => Number(i.id) === centerId)
            if(center){
                console.log("Center: ", center)
                centerName = center.name
                centerPhone = center.phone
                centerAddress = center.address
            }
        }
        setIsSubmitting(true) 
        const formData = {
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            customerAddress: data.customerAddress,
            customerStatus: ScheduleCustomerStatusData[0],
            requestTime: data.requestTime,
            requestDate: data.requestDate,
            centerId: centerId,
            centerName: centerName,
            centerPhone: centerPhone,
            centerAddress: centerAddress
        } 
        console.log("Form Data: ", formData)
        try {
            // Simulate API call
            console.log("Submitting to API...");
            const res = await _scheduleOfCustomerStoreAction(formData);
            console.log("API Response:", res);

            if(res.status == 1) {
                await getScheduleOfCustomerDataList()
                toast.success(res.message);
                setIsModal(false);
                resetData()
                return
            }
            toast.error('Something went wrong. Please try again.');
            return
        } catch (error) {
            toast.error('Failed to add Data. Please try again.');
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
                        <ButtonClose onClick={() => setIsModal(false)} />
                    </div>

                    <form onSubmit={handleSubmit} className='flex flex-col items-start justify-center gap-4'>
                        <div className='w-full'>
                            <TitlePrimary title="Add Schedule" />
                        </div>
                        <div className='grid grid-cols-2 w-full gap-4'>
                            <div className='w-full'>
                                <TextInputPrimary
                                    label='Request Date:' 
                                    name='requestDate' 
                                    type="date"
                                    value={data.requestDate} 
                                    placeholder='Enter your Date...'
                                    onChange={setInputValue} 
                                />
                                <ErrorPrimary msg={errors.requestDate} />
                            </div>
                            <div className='w-full'>
                                <TextInputPrimary
                                    label='Request Time:' 
                                    name='requestTime' 
                                    type="time"
                                    value={data.requestTime} 
                                    placeholder='Enter your Time...'
                                    onChange={setInputValue} 
                                />
                                <ErrorPrimary msg={errors.requestTime} />
                            </div>
                        </div>
                        <div className='w-full'>
                            <SelectInputPrimary
                                label='Center Name:' 
                                name='centerId' 
                                type="text"
                                dbData={centerList}
                                value={data.centerId} 
                                onChange={(e) => {
                                    setInputValue(e)
                                    setError("centerId", "")
                                    setError("centerName", "")
                                }} 
                            />
                            <ErrorPrimary msg={errors.centerId} />
                        </div>
                        <div className='w-full'>
                            <TextInputPrimary
                                label='Customer Name:' 
                                name='customerName' 
                                type="text"
                                value={data.customerName} 
                                placeholder='Enter Customer Name...'
                                onChange={setInputValue} 
                            />
                            <ErrorPrimary msg={errors.customerName} />
                        </div>
                        <div className='w-full'>
                            <TextInputPrimary
                                label='Customer Phone:' 
                                name='customerPhone' 
                                type="text"
                                value={data.customerPhone} 
                                placeholder='Enter your Customer Phone...'
                                onChange={setInputValue} 
                            />
                            <ErrorPrimary msg={errors.customerPhone} />
                        </div>
                        <div className='w-full'>
                            <TextInputPrimary
                                label='Customer Address:' 
                                name='customerAddress' 
                                type="text"
                                value={data.customerAddress} 
                                placeholder='Enter your Customer Address...'
                                onChange={setInputValue} 
                            />
                            <ErrorPrimary msg={errors.customerAddress} />
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