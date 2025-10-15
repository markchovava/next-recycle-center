"use server";
import { BaseURL } from "@/_api/BaseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export async function _scheduleOfCustomerIndexAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule-of-customer`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function _scheduleOfRecyclerIndexAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule-of-recycler`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function _scheduleOfCustomerStoreAction(data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule-of-customer`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function _scheduleOfRecyclerStoreAction(data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule-of-recycler`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function _scheduleRecyclerStatusUpdateAction(id: string | number, data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule-recycler-status/${id}`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}
export async function _scheduleCustomerStatusUpdateAction(id:string | number, data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule-customer-status/${id}`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}
export async function _scheduleCustomerUpdateAction(id:string | number, data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule-customer/${id}`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}
export async function _scheduleRecyclerUpdateAction(id:string | number, data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule-recycler/${id}`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}
export async function _scheduleRecyclerStoreAction(data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule-recycler`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}
export async function _scheduleCustomerStoreAction(data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule-customer`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}
export async function _scheduleByRecyclerAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule-by-recycler`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}
export async function _scheduleByCustomerAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule-by-customer`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}
export async function _scheduleByUserAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule-by-user`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}
export async function _scheduleSearchCenterAction(search: string) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule-center-search/${search}`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}
export async function _scheduleSearchRecyclerAction(search: string) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule-recycler-search/${search}`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}
export async function _scheduleSearchCustomerAction(search: string) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    
    const res = await fetch(`${BaseURL}api/schedule-customer-search/${search}`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}
export async function _scheduleAllAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }

    const res = await fetch(`${BaseURL}api/schedule-all/`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}
export async function _schedulePaginateAction(url: string = `${BaseURL}schedule/`) {
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
export async function _scheduleListAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/schedule/`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}
export async function _scheduleViewAction(id: number | string) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }

    const res = await fetch(`${BaseURL}schedule/${id}`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}
export async function _scheduleStoreAction(data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    
    const res = await fetch(`${BaseURL}api/schedule/`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    revalidatePath('/admin/schedule');
    return await res.json();
}
export async function _scheduleUpdateAction(id: string | number, data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    
    const res = await fetch(`${BaseURL}api/schedule/${id}`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    revalidatePath(`/admin/schedule/${id}`);
    return await res.json();
}
export async function _scheduleDeleteAction(id: number | string) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RECYCLEMATE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    
    const res = await fetch(`${BaseURL}api/schedule/${id}`, {
      'method': 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    });
    revalidatePath('/admin/schedule');
    return await res.json();
}