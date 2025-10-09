"use client"
import { getTheCookie } from "@/_cookies/CookiesClient";
import { AuthEntity, AuthInterface } from "@/_data/entity/AuthEntity";
import { RolesData } from "@/_data/sample/RolesData";
import { validateEmail } from "@/_utils/FormValidation";
import { create } from "zustand"



interface AuthStoreInterface{
    data: AuthInterface,
    preData: AuthInterface,
    errors: AuthInterface,
    isLoading: boolean,
     // Actions
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>
    ) => void,
    setData: (data: AuthInterface) => void,
    setIsSubmit: (isSubmit: boolean) => void,
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: AuthInterface },
    clearErrors: () => void,
    setError: (field: keyof AuthInterface, message: string) => void,
    fetchAuthCookie: () => Promise<void>,
}


export const useAuthStore = create<AuthStoreInterface>((set, get) => ({
    preData: AuthEntity,
    data: AuthEntity,
    errors: AuthEntity,
    isLoading: true,
    setInputValue: (e) => {
        const { name, value } = e.target;
        const currentData = get().data;
        const currentErrors = get().errors;
        if (name === "role") {
            const selectedRole = RolesData.find(i => i.name === value);
            set({
                data: {
                    ...currentData,
                    role: value,
                    roleLevel: selectedRole ? selectedRole.value : 0
                },
                // Clear error for this field if it exists
                errors: currentErrors[name as keyof typeof currentErrors]
                    ? { ...currentErrors, [name]: "" }
                    : currentErrors
            });
        } 
        else {
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
        }
    },
    setData: (data) => {
        set({
            preData: data,
            data: data,
        })
    },
    setIsSubmit: (isSubmit) => {
        set((state) => ({
            data: {
                ...state.data,
                isSubmit
            }
        }))
    },
    validateField: (name, value) => {
        let error = ""
        switch(name){
            case "name":
                if(!value.trim()) {
                    error = "Name is required.";
                }
                break;
            case "email":
                if(!value.trim()){
                    error = "Email is required.";
                } else if(!validateEmail(value)){
                    error = "Please enter a valid email address.";
                }
                break;
            case "phone":
                if (!value.trim()) {
                    error = "Phone is required.";
                }
                break;
            case "address":
                if (!value.trim()) {
                    error = "Address is required.";
                }
                break;
            case "role":
                if (!value || value === "0") {
                    error = "Role is required.";
                }
                break;
            default:
                break;
        }
        return error;
    },
    validateForm: () => {
        const { data } = get();
        let errors = { ...AuthEntity };
        let hasError = false;
        
        // Validate name
        const nameError = get().validateField("name", data.name);
        if (nameError) {
            errors.name = nameError;
            hasError = true;
        }
        // Validate email
        const emailError = get().validateField("email", data.email);
        if (emailError) {
            errors.email = emailError;
            hasError = true;
        }
        // Validate phone
        const phoneError = get().validateField("phone", data.phone);
        if (phoneError) {
            errors.phone = phoneError;
            hasError = true;
        }
        
        // Validate address
        const addressError = get().validateField("address", data.address);
        if (addressError) {
            errors.address = addressError;
            hasError = true;
        }
        
        // Validate role (if needed - currently commented out in modal)
        /* const roleError = get().validateField("role", data.role);
        if (roleError) {
            errors.role = roleError;
            hasError = true;
        } */
        
        set({ errors });
        
        return {
            isValid: !hasError,
            errors
        };
    },
    clearErrors: () => {
        set({ errors: AuthEntity })
    },
    setError: (field, message) => {
        set((state) => ({
            errors: {
                ...state.errors,
                [field]: message
            }
        }));
    },
    fetchAuthCookie: async () => {
        set({ isLoading: true });
        try {
            const theCookieData = await getTheCookie("RECYCLEMATE_CURRENT_USER_COOKIE");
            if (theCookieData) {
                const parsedData = JSON.parse(theCookieData);  
                const foundRole = RolesData.find((i) => Number(i.value) === Number(parsedData.roleLevel));
                const roleData = {
                    ...parsedData,
                    role: foundRole ? foundRole.name : ""
                };  
                set({
                    preData: roleData,
                    data: roleData,
                    isLoading: false
                });
            } else {
                set({ isLoading: false });
            }
        } catch (error) {
            console.error("Failed to fetch or parse cookie data:", error);
            set({ isLoading: false });
        }
    }
}))


