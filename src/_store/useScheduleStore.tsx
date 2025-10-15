"use client"
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface } from "@/_data/entity/ResponseEntity";
import { ScheduleEntity, ScheduleInterface } from "@/_data/entity/ScheduleEntity";
import { create } from "zustand";


interface DataListInterface{
    meta: MetaInterface,
    links: MetaLinksInterface
    data: ScheduleInterface[]
}


interface ScheduleStoreInterface{
    data: ScheduleInterface,
    preData: ScheduleInterface,
    dataList: ScheduleInterface[],
    message: string,
    errors: ScheduleInterface,
    isLoading: boolean,
    isSearching: boolean,
    isSubmitting: boolean,
    search: string,
    meta: MetaInterface,
    links: MetaLinksInterface,
     // Actions
    setInputValue: (
        e: React.ChangeEvent<HTMLInputElement> | 
        React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>
    ) => void,
    setDataList: (data: DataListInterface) => void,
    setData: (data: ScheduleInterface) => void,
    setMessage: (i: string) => void,
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setIsSubmitting: (status: boolean) => void,
    setError: (field: keyof ScheduleInterface, message: string) => void,
    resetData: () => void
    validateField: (name: string, value: string) => string,
    validateCustomerForm: () => { isValid: boolean; errors: ScheduleInterface },
    getDataList: () => Promise<void>,
    getPaginatedDataList: (url: string) => Promise<void>,
    getSearchDataList: (search: string) => void, 
   
}


export const useScheduleStore = create<ScheduleStoreInterface>((set, get) => ({
    data: ScheduleEntity,
    preData: ScheduleEntity,
    message: "",
    errors: ScheduleEntity,
    meta: MetaEntity,
    links: MetaLinksEntity,
    isLoading: true,
    isSearching: false,
    search: "",
    isSubmitting: false,
    dataList: [],
    // Actions
    setMessage: (msg) => {
        set({
            message: msg
        })
    },    
    setSearch: (e) => {
        const { value } = e.target;
        set({
            search: value
        })
    },
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
    validateField: (name, value) => {
        let error = ""
        switch(name){
            case "requestDate":
                if(!value.trim()){
                    error = "Request Date is required.";
                } 
                break;
            case "requestTime":
                if(!value.trim()){
                    error = "Request Time is required.";
                } 
                break;
            case "customerName":
                if(!value.trim()) {
                    error = "Customer Name is required.";
                }
                break;
            case "customerPhone":
                if(!value.trim()) {
                    error = "Customer Phone Number is required.";
                }
                break;
            case "customerAddress":
                if(!value.trim()){
                    error = "Customer Address is required.";
                } 
                break;
            case "recyclerName":
                if(!value.trim()){
                    error = "Recycler Name is required.";
                } 
                break;
            case "recyclerPhone":
                if(!value.trim()){
                    error = "Recycler Phone Number is required.";
                } 
                break;
            case "recyclerAddress":
                if(!value.trim()){
                    error = "Recycler Address is required.";
                } 
                break;
            case "centerId":
                if(!value.trim()){
                    error = "Center Name is required.";
                } 
                break;
            case "centerPhone":
                if(!value.trim()){
                    error = "Center Phone Number is required.";
                } 
                break;
            case "centerAddress":
                if(!value.trim()){
                    error = "Center Address is required.";
                } 
                break;
            case "collectionDate":
                if(!value.trim()){
                    error = "Collection Date is required.";
                } 
                break;  
            case "collectionTime":
                if(!value.trim()){
                    error = "Collection Time is required.";
                } 
                break;    
            default:
                break;
        }
        return error
    },
    validateCustomerForm: () => { 
    const { data } = get();
    let errors = { ...ScheduleEntity };
    let hasError = false;
    
    // Validate requestDate
    const requestDateError = get().validateField("requestDate", data.requestDate);
    if (requestDateError) {
        errors.requestDate = requestDateError;
        hasError = true;
    }
    
    // Validate requestTime
    const requestTimeError = get().validateField("requestTime", data.requestTime);
    if (requestTimeError) {
        errors.requestTime = requestTimeError;
        hasError = true;
    }
    
    // Validate CUSTOMER NAME
    const customerNameError = get().validateField("customerName", data.customerName);
    if (customerNameError) {
        errors.customerName = customerNameError;
        hasError = true;
    }
    
    // Validate CUSTOMER PHONE
    const customerPhoneError = get().validateField("customerPhone", data.customerPhone);
    if (customerPhoneError) {
        errors.customerPhone = customerPhoneError;
        hasError = true;
    }
    
    // Validate CUSTOMER ADDRESS
    const customerAddressError = get().validateField("customerAddress", data.customerAddress);
    if (customerAddressError) {
        errors.customerAddress = customerAddressError;
        hasError = true;
    }
    
    
    const centerIdError = get().validateField("centerId", String(data.centerId));
    if (centerIdError) {
        errors.centerId = centerIdError;
        hasError = true;
    }
    
    set({ errors });
    return {
        isValid: !hasError,
        errors
    };
},
    setData: (data) => {
        set({
            data: data,
            preData: data,
            isLoading: false,
        })
    },
    setDataList: (res) => {
        const {links, meta, data} = res
        set({
            dataList: data,
            links: links,
            meta: meta,
            isLoading: false,
        })
    },
    setIsSubmitting: (status) => {
        set({isSubmitting: status})
    },
    clearErrors: () => {
        set({ errors: ScheduleEntity })
    },
    setError: (field, message) => {
        set((state) => ({
            errors: {
                ...state.errors,
                [field]: message
            }
        }));
    },
    resetData: () => {
        set({
            data: ScheduleEntity,
        })
    },
    getDataList: async () => {},
    getPaginatedDataList: async (url: string) => {},
    getSearchDataList: (search: string) => {}, 
    
   

})) 