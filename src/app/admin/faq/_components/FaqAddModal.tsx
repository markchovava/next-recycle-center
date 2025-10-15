"use client"
 

import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import TitlePrimary from '@/_components/titles/TitlePrimary';
import TextInputPrimary from '@/_components/forms/TextInputPrimary';
import ButtonSubmit from '@/_components/buttons/ButtonSubmit';
import TextAreaPrimary from '@/_components/forms/TextAreaPrimary';
import { _faqStoreAction } from '@/_actions/FaqActions';
import { useFaqStore } from '@/_store/useFaqStore';



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
    } = useFaqStore()
           
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            // Clear previous errors
            clearErrors();
            // Validate form using store
            const validation = validateForm();
            if (!validation.isValid) {
                // Show the first error as toast
                const firstError = validation.errors.question || validation.errors.answer;
                toast.warn(firstError);
                return;
            }
            setIsSubmitting(true);
            const formData = {
                question: data.question,
                answer: data.answer,
            }
            
            try {
                const res = await _faqStoreAction(formData);
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
                            name='question' 
                            type="text"
                            value={data.question} 
                            placeholder='Enter your Question...'
                            onChange={setInputValue} 
                        />
                        <TextAreaPrimary
                            label='Answer:' 
                            name='answer' 
                            value={data.answer} 
                            placeholder='Enter your Answer...'
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
