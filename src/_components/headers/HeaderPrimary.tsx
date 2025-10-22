"use client"
import { useLayoutEffect, useState } from 'react'
import ButtonSubmit from '../buttons/ButtonSubmit'
import LogoPrimary from '../logos/LogoPrimary'
import { _logout } from '@/_actions/AuthActions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { AuthTokenCookieName, getTheCookie, removeTheCookie, UserCookieName } from '@/_cookies/CookiesClient'
import { CookieValueTypes } from 'cookies-next'


export default function HeaderPrimary() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      try{
        setIsSubmitting(true)
        const res = await _logout()
        console.log(res)
        if(res.status == 1){
          toast.success(res.message)
          removeTheCookie(AuthTokenCookieName)
          removeTheCookie(UserCookieName)
          router.push('/login')
          return
        }
        toast.warn("Something went wrong, please try again.")
      } catch(error){

      } finally{
        setIsSubmitting(false)
      }
  }
  
   const [authCookie, setAuthCookie] = useState<CookieValueTypes | null>(null);
      const [isLoading, setIsLoading] = useState(true);
  
      useLayoutEffect(() => {
          const checkCookie = async () => {
              const theCookie = await getTheCookie(AuthTokenCookieName);
              console.log(theCookie);
              setAuthCookie(theCookie);
              setIsLoading(false);
          };
          
          checkCookie();
      }, []);
  
      // Don't render until cookie is checked
      if (isLoading) {
          return null;
      }
  return (
    <>
    <section className='border-b-4 border-green-600'>
        <div className={`mx-auto w-[92%] py-2 flex items-center transition-all ease-initial duration-300 justify-between`}>
            <LogoPrimary />
        
            {authCookie ?
              <form onSubmit={handleSubmit}>
                  <ButtonSubmit
                      isSubmit={isSubmitting}
                      title="Logout" 
                  />
              </form>
              : ""
            }


        </div>
    </section>
    </>
  )
}
