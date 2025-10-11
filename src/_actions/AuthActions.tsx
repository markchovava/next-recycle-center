"use server";

import { revalidatePath } from "next/cache";
import { BaseURL} from '@/_api/BaseURL'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function registerAction(data: any) {
    const res = await fetch(`${BaseURL}register`, {
        "mode": "no-cors",
        'method': 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    revalidatePath('/login');
    return await res.json();
}


export async function loginAction(data: any) {
    const res = await fetch(`${BaseURL}login`, {
        //"mode": "no-cors",
        'method': 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    revalidatePath('/admin');
    return await res.json();
}


export async function _authStoreAction(data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }

    const res = await fetch(`${BaseURL}api/profile`, {
      'method': 'POST',
      body: JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    revalidatePath('/admin/profile');
    return await res.json();
}


export async function _authViewAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }

    const res = await fetch(`${BaseURL}api/profile`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}



export async function _logout() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }

    const res = await fetch(`${BaseURL}api/logout`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}