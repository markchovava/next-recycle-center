"use server";

import { revalidatePath } from "next/cache";
import { BaseURL} from '@/_api/BaseURL'


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
        "mode": "no-cors",
        'method': 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    revalidatePath('/admin');
    return await res.json();
}