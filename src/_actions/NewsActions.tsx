"use server";

import { BaseURL } from "@/_api/BaseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";




export async function newsViewAction(id: number | string) {
    const res = await fetch(`${BaseURL}news/${id}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function newsPriorityStatusListAction() {
    const res = await fetch(`${BaseURL}news-priority-status/`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function newsSearchPriorityStatusListAction(search: string) {
    const res = await fetch(`${BaseURL}news-priority-status/${search}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function newsListAction() {
    const res = await fetch(`${BaseURL}news/`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function _newsSearchAction(search: string) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    
    const res = await fetch(`${BaseURL}api/news-search/${search}`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function _newsAllAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }

    const res = await fetch(`${BaseURL}api/news-all/`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function _newsPaginateAction(url: string = `${BaseURL}api/news/`) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }

    const res = await fetch(`${url}`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function _newsListAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/news/`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function _newsViewAction(id: number | string) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }

    const res = await fetch(`${BaseURL}api/news/${id}`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function _newsStoreAction(data: FormData) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    
    const res = await fetch(`${BaseURL}api/news/`, {
      'method': 'POST',
      'body': data,
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
      } 
    });
    revalidatePath('/admin/news');
    return await res.json();
}

export async function _newsUpdateAction(id: string | number, data: FormData) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    
    const res = await fetch(`${BaseURL}api/news/${id}`, {
      'method': 'POST',
      'body': data,
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
      }
    });
    revalidatePath(`/admin/news/${id}`);
    return await res.json();
}

export async function _newsDeleteAction(id: number | string) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    
    const res = await fetch(`${BaseURL}api/news/${id}`, {
      'method': 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    });
    revalidatePath('/admin/news');
    return await res.json();
}