"use server";

import { BaseURL } from "@/_api/BaseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";





export async function _profileStoreAction(data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('NETWORK_RESILIENCE_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${BaseURL}api/profile`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    });
    revalidatePath('/admin/profile');
    revalidatePath('/admin/user');
    return await res.json();
}