"use client"

import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import TitlePrimary from '@/_components/titles/TitlePrimary';
import TextInputPrimary from '@/_components/forms/TextInputPrimary';
import ButtonSubmit from '@/_components/buttons/ButtonSubmit';
import SelectInputSecondary from '@/_components/forms/SelectInputSecondary';
import { useScheduleStore } from '@/_store/useScheduleStore';
import ErrorPrimary from '@/_components/forms/ErrorPrimary';
import { ScheduleRecyclerStatusData } from '@/_data/sample/ScheduleData';
import { _scheduleOfRecyclerUpdateAction } from '@/_actions/ScheduleActions';




/* ---------------------------------- */
const title = "Edit Schedule"
/* ---------------------------------- */


const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1,
        transition: {
            type: 'spring', // The type must be a specific literal
            duration: 1,
        }},
}

interface ScheduleEditModalInterface{
    id: string | number,
    isModal: boolean,
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}



export default function MyRecyclerScheduleEditModal({
        id,
        isModal, 
        setIsModal
    }: ScheduleEditModalInterface
) {
    const { data, 
        setIsSubmitting, 
        isSubmitting, 
        setInputValue,
        validateRecyclerForm,
        errors,
        getScheduleData,
    } = useScheduleStore()

   

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        console.log("Clicked")
        e.preventDefault();
        console.log(data)
        setIsSubmitting(false);
        const validation = validateRecyclerForm();
        if (!validation.isValid) {
            const firstError = validation.errors.collectionDate ||
                validation.errors.collectionTime ||
                validation.errors.recyclerName || 
                validation.errors.recyclerPhone ||
                validation.errors.recyclerStatus ||
                validation.errors.recyclerAddress;
            toast.warn(firstError);
            return;
        }  
             
        setIsSubmitting(true) 
        const formData = {
            recyclerName: data.recyclerName,  
            recyclerPhone: data.recyclerPhone,  
            recyclerAddress: data.recyclerAddress, 
            recyclerStatus: data.recyclerStatus,
            collectionTime: data.collectionTime,
            collectionDate: data.collectionDate,
            customerStatus: data.recyclerStatus,
        } 
        console.log("Form Data: ", formData)
        try {
            console.log("Submitting to API...");
            const res = await _scheduleOfRecyclerUpdateAction(id, formData);
            console.log("API Response:", res);

            if(res.status == 1) {
                await getScheduleData(id)
                toast.success(res.message);
                setIsModal(false);
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



    console.log("data", data)
    
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
                            <TitlePrimary title={title} />
                        </div>
                        <div className='grid grid-cols-2 w-full gap-4'>
                            <div className='w-full'>
                                <TextInputPrimary
                                    label='Collection Date:' 
                                    name='collectionDate' 
                                    type="date"
                                    value={data.collectionDate} 
                                    placeholder='Enter your Date...'
                                    onChange={setInputValue} 
                                />
                                <ErrorPrimary msg={errors.collectionDate} />
                            </div>
                            <div className='w-full'>
                                <TextInputPrimary
                                    type="time"
                                    label='Time:' 
                                    name='collectionTime' 
                                    value={data.collectionTime} 
                                    placeholder='Enter your Time...'
                                    onChange={setInputValue} 
                                />
                                <ErrorPrimary msg={errors.collectionTime} />
                            </div>
                        </div>
                        <div className='w-full'>
                            <TextInputPrimary
                                label='Recycler Name:' 
                                name='recyclerName' 
                                type="text"
                                value={data.recyclerName} 
                                placeholder='Enter your Recycler Name...'
                                onChange={setInputValue} 
                            />
                            <ErrorPrimary msg={errors.recyclerName} />
                        </div>
                         <div className='w-full'>
                            <SelectInputSecondary
                                label='Recycler Status:' 
                                name='recyclerStatus' 
                                dbData={ScheduleRecyclerStatusData}
                                value={data.recyclerStatus} 
                                onChange={setInputValue} 
                            />
                            <ErrorPrimary msg={errors.recyclerStatus} />
                        </div>
                        <div className='w-full'>
                            <TextInputPrimary
                                type="text"
                                label='Recycler Phone:' 
                                name='recyclerPhone' 
                                value={data.recyclerPhone} 
                                placeholder='Enter your Recycler Phone...'
                                onChange={setInputValue} 
                            />
                            <ErrorPrimary msg={errors.recyclerPhone} />
                        </div>
                         <div className='w-full'>
                            <TextInputPrimary
                                type="text"
                                name='recyclerAddress' 
                                label='Recycler Address:' 
                                value={data.recyclerAddress} 
                                placeholder='Enter your Recycler Address...'
                                onChange={setInputValue} 
                            />
                            <ErrorPrimary msg={errors.recyclerAddress} />
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