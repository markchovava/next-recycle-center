"use client"

import { appInfoViewAction } from "@/_actions/AppInfoActions"
import { AppInfoEntity, AppInfoInterface } from "@/_data/entity/AppInfoEntity"
import { create } from "zustand"


interface AppInfoStoreInterface{
    data: AppInfoInterface,
    preData: AppInfoInterface,
    errors: AppInfoInterface,
    isLoading: boolean,
    isSubmitting: boolean,
    message: string,
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>
    ) => void,
    setData: (data: AppInfoInterface) => void,
    getData: () => Promise<void>,
    setMessage: (msg: string) => void,
    setIsSubmitting: (status: boolean) => void,
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: AppInfoInterface },
    clearErrors: () => void,
}


export const useAppInfoStore = create<AppInfoStoreInterface>((set, get) => ({
    data: AppInfoEntity,
    preData: AppInfoEntity,
    errors: AppInfoEntity,
    isLoading: true,
    isSubmitting: false,
    message: "",
    setInputValue: (e) => {
        const { name, value } = e.target;
        const currentData = get().data;
        const currentErrors = get().errors;
        set({
            data: {
                ...currentData,
                [name]: value
            },
            // Clear error for this field if it exists
            errors: currentErrors[name as keyof typeof currentErrors]
                ? { ...currentErrors, [name]: "" }
                : currentErrors
        });
    },
    setData: (data) => {
        set({
            data: data,
            preData: data,
            isLoading: false
        })
    },
    getData: async () => {
        try {
            const res = await appInfoViewAction();
            if (res && res.data ) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                set({
                    data: AppInfoEntity,
                    preData: AppInfoEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: AppInfoEntity,
                preData: AppInfoEntity,
                isLoading: false,
            });
        }
    },
    setIsSubmitting: (status) => {
        set({isSubmitting: status})
    },
    clearErrors: () => {
            set({ errors: AppInfoEntity })
    },
    setMessage: (msg) => {
        set({
            message: msg
        })
    },
    validateField: (name, value) => {
        let error = ""
        switch(name){
            case "name":
                if(!value.trim()) {
                    error = "Name is required.";
                }
                break;
            case "phone":
                if(!value.trim()) {
                    error = "Phone is required.";
                }
                break;
            case "email":
                if(!value.trim()){
                    error = "Email is required.";
                } 
                break;
            case "address":
                if (!value.trim()) {
                    error = "Address is required.";
                }
                break;
            case "city":
                if (!value.trim()) {
                    error = "City is required.";
                }
                break;
            case "province":
                if (!value.trim()) {
                    error = "Province is required.";
                }
                break;
            case "description":
                if(!value.trim()){
                    error = "Description is required.";
                }
                break;
            default:
                break;
        }
        return error
    },
    validateForm: () => { 
        const { data } = get();
        let errors = { ...AppInfoEntity };
        let hasError = false;
        // Validate name
        const nameError = get().validateField("name", data.name);
        if (nameError) {
            errors.name = nameError;
            hasError = true;
        }
        // Validate PHONE
        const phoneError = get().validateField("phone", data.phone);
        if (phoneError) {
            errors.phone = phoneError;
            hasError = true;
        }
        // Validate PHONE
        const emailError = get().validateField("email", data.email);
        if (emailError) {
            errors.email = emailError;
            hasError = true;
        }
        // Validate Email
        const addressError = get().validateField("address", data.address);
        if (addressError) {
            errors.address = addressError;
            hasError = true;
        }

        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    },
}))