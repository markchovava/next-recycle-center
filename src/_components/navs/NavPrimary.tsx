"use client"
import Link from "next/link";
import LogoPrimary from "../logos/LogoPrimary";
import { NavLinksData } from "@/_data/sample/NavLinksData";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { AuthTokenCookieName, getTheCookie } from "@/_cookies/CookiesClient";
import { useLayoutEffect, useState } from "react";
import { CookieValueTypes } from "cookies-next";



export default function NavPrimary() {
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
            <nav className='lg:flex hidden justify-between items-center gap-4 pr-[4%]'>
                <div className='bg-white text-green-800 py-3 pl-3 pr-4'>
                    <LogoPrimary />
                </div>
                <ul className='text-white text-xl flex items-center justify-start gap-4'>
                    {NavLinksData.map((i, key) => (
                        <Link key={key} href={i.href}>
                            <li className='font-medium py-3 hover:text-gray-100 border-b-2 border-transparent hover:border-gray-100 ease-initial duration-200 transition-all'>
                                {i.title}
                            </li>
                        </Link>
                    ))}
                </ul>
                {authCookie ? (
                    <Link href="/admin">
                        <ButtonSecondary 
                            title="Dashboard"
                            css="px-8 py-3 text-xl" 
                        />
                    </Link>
                ) : (
                    <Link href="/login">
                        <ButtonSecondary 
                            title="Login"
                            css="px-8 py-3 text-xl" 
                        />
                    </Link>
                )}
            </nav>

            <nav className="flex lg:hidden flex-col justify-between items-center gap-4">
                <div className='bg-white text-green-800 py-3 pl-3 pr-4'>
                    <LogoPrimary />
                </div>
                <ul className='text-white text-xl flex flex-col items-center justify-start gap-4'>
                    {NavLinksData.map((i, key) => (
                        <Link key={key} href={i.href}>
                            <li className='font-medium py-3 hover:text-gray-100 border-b-2 border-transparent hover:border-gray-100 ease-initial duration-200 transition-all'>
                                {i.title}
                            </li>
                        </Link>
                    ))}
                </ul>
                {authCookie ? (
                    <Link href="/admin">
                        <ButtonSecondary 
                            title="Dashboard"
                            css="px-8 py-3 text-xl" 
                        />
                    </Link>
                ) : (
                    <Link href="/login">
                        <ButtonSecondary 
                            title="Login"
                            css="px-8 py-3 text-xl" 
                        />
                    </Link>
                )}
            </nav>
        </>
    );
}