"use client"

import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import TitlePrimary from '@/_components/titles/TitlePrimary';
import TextInputPrimary from '@/_components/forms/TextInputPrimary';
import ButtonSubmit from '@/_components/buttons/ButtonSubmit';
import { _profileStoreAction } from '@/_actions/ProfileActions';
import { useAuthStore } from '@/_store/useAuthStore';
import { setTheCookie, UserCookieName } from '@/_cookies/CookiesClient';



const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1,
        transition: {
            type: 'spring', // The type must be a specific literal
            duration: 1,
        }},
}

interface ProfileEditModalInterface{
    isModal: boolean,
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>,
}





export default function ProfileEditModal({
        isModal, 
        setIsModal, 
    }: ProfileEditModalInterface
) {
    const { 
        data, 
        errors, 
        setInputValue, 
        validateForm, 
        clearErrors, 
        setError, 
        setIsSubmit,
        setData
    } = useAuthStore()


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // Clear previous errors
        clearErrors();
        // Validate form using store
        const validation = validateForm();
        if (!validation.isValid) {
            // Show the first error as toast
            const firstError = validation.errors.name || 
                validation.errors.email || validation.errors.phone || 
                validation.errors.address;
            toast.warn(firstError);
            return;
        }
        setIsSubmit(true);
        const formData = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
        }
        try {
            const res = await _profileStoreAction(formData);
            if(res.status === 0){
                setError('email', res.message);
                toast.warn(res.message);
                return;
            }
            if(res.status === 1){
                toast.success(res.message);
                setData(res.data)
                setTheCookie(UserCookieName, res.data)
                clearErrors();
                setIsModal(false);
            }
        } catch (error) {
            toast.error('Failed to update data. Please try again.');
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
                <section className='mx-auto lg:w-[50%] w-[90%] bg-white text-black p-6 rounded-2xl'>
                    <div className='flex items-center justify-end'>
                        <button onClick={() => setIsModal(false)} className='hover:text-red-600 transition-all ease-in-out duration-200'>
                            <IoClose className='text-3xl' />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className='flex flex-col items-start justify-center gap-4'>
                        <div className='w-full'>
                            <TitlePrimary title="Edit Profile" />
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
                            {errors.name &&
                                <p className="text-sm text-red-600">{errors.name}</p>
                            }
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
                            {errors.email &&
                                <p className="text-sm text-red-600">{errors.email}</p>
                            }
                        </div>

                       {/*  <div className='w-full'>
                            <SelectInputPrimary
                                label="Role:"
                                name="roleLevel"
                                dbData={RolesData}
                                value={data.roleLevel}
                                onChange={setInputValue}
                            />
                            {errors.role &&
                                <p className="text-sm text-red-600">{errors.role}</p>
                            }
                        </div> */}

                        <div className='w-full'>
                            <TextInputPrimary
                                label='Phone Number:' 
                                name='phone' 
                                type="text"
                                value={data.phone} 
                                placeholder='Enter your Phone Number...'
                                onChange={setInputValue} 
                            />
                            {errors.phone &&
                                <p className="text-sm text-red-600">{errors.phone}</p>
                            }
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
                            {errors.address &&
                                <p className="text-sm text-red-600">{errors.address}</p>
                            }
                        </div>
                        <div className='w-full flex items-center justify-center pt-1'>
                            <ButtonSubmit 
                                title='Submit' 
                                isSubmit={data.isSubmit} 
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
