"use client"
import { _scheduleByCustomerSearchAction, _scheduleOfCustomerIndexAction, _scheduleOfRecyclerIndexAction, _scheduleSearchCustomerAction, _scheduleSearchRecyclerAction, _scheduleViewAction } from "@/_actions/ScheduleActions";
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
    clearErrors: () => void,
    resetData: () => void
    validateField: (name: string, value: string) => string,
    validateCustomerForm: () => { isValid: boolean; errors: ScheduleInterface },
    validateRecyclerForm: () => { isValid: boolean; errors: ScheduleInterface },
    getDataList: () => Promise<void>,
    getPaginatedDataList: (url: string) => Promise<void>,
    getSearchScheduleCustomerDataList: (search: string) => Promise<void>, 
    getScheduleOfCustomerDataList: () => Promise<void>,
    getScheduleOfRecyclerDataList: () => Promise<void>,
    getSearchScheduleRecyclerDataList: (search: string) => Promise<void>,
    getScheduleData: (id: number | string) => Promise<void>,
    getSearchScheduleByCustomerDataList: (search: string) => Promise<void>
   
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
    
    // Handle null or undefined values
    const safeValue = value ?? "";
    
    switch(name){
        case "requestDate":
            if(!safeValue.trim()){
                error = "Request Date is required.";
            } 
            break;
        case "requestTime":
            if(!safeValue.trim()){
                error = "Request Time is required.";
            } 
            break;
        case "customerName":
            if(!safeValue.trim()) {
                error = "Customer Name is required.";
            }
            break;
        case "customerPhone":
            if(!safeValue.trim()) {
                error = "Customer Phone Number is required.";
            }
            break;
        case "customerAddress":
            if(!safeValue.trim()){
                error = "Customer Address is required.";
            } 
            break;
        case "recyclerName":
            if(!safeValue.trim()){
                error = "Recycler Name is required.";
            } 
            break;
        case "recyclerPhone":
            if(!safeValue.trim()){
                error = "Recycler Phone Number is required.";
            } 
            break;
        case "recyclerAddress":
            if(!safeValue.trim()){
                error = "Recycler Address is required.";
            } 
            break;
        case "recyclerStatus":
            if(!safeValue.trim()){
                error = "Recycler Status is required.";
            } 
            break;
        case "centerId":
            if(!safeValue.trim()){
                error = "Center Name is required.";
            } 
            break;
        case "centerPhone":
            if(!safeValue.trim()){
                error = "Center Phone Number is required.";
            } 
            break;
        case "centerAddress":
            if(!safeValue.trim()){
                error = "Center Address is required.";
            } 
            break;
        case "collectionDate":
            if(!safeValue.trim()){
                error = "Collection Date is required.";
            } 
            break;  
        case "collectionTime":
            if(!safeValue.trim()){
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
        
        // Always set errors, even if empty
        set({ errors });
        
        return {
            isValid: !hasError,
            errors
        };
    },
    validateRecyclerForm: () => { 
        const { data } = get();
        let errors = { ...ScheduleEntity };
        let hasError = false;
        // Validate requestDate
        const collectionDateError = get().validateField("collectionDate", data.collectionDate);
        if (collectionDateError) {
            errors.collectionDate = collectionDateError;
            hasError = true;
        }
        // Validate COLLECTION TIME
        const collectionTimeError = get().validateField("collectionTime", data.collectionTime);
        if (collectionTimeError) {
            errors.collectionTime = collectionTimeError;
            hasError = true;
        }
        // Validate RECYCLER NAME
        const recyclerNameError = get().validateField("recyclerName", data.recyclerName);
        if (recyclerNameError) {
            errors.recyclerName = recyclerNameError;
            hasError = true;
        }
        // Validate RECYCLER PHONE
        const recyclerPhoneError = get().validateField("recyclerPhone", data.recyclerPhone);
        if (recyclerPhoneError) {
            errors.recyclerPhone = recyclerPhoneError;
            hasError = true;
        }
        // Validate RECYCLER ADDRESS
        const recyclerStatusError = get().validateField("recyclerStatus", data.recyclerStatus);
        if (recyclerStatusError) {
            errors.recyclerStatus = recyclerStatusError;
            hasError = true;
        }
        // Validate RECYCLER ADDRESS
        const recyclerAddressError = get().validateField("recyclerAddress", data.recyclerAddress);
        if (recyclerAddressError) {
            errors.recyclerAddress = recyclerAddressError;
            hasError = true;
        }
        // Always set errors, even if empty
        set({ errors });
        // 
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
    getPaginatedDataList: async (url) => {},
    getSearchScheduleCustomerDataList: async (search) => {
        set({ isLoading: true });
        try {
            const res = await _scheduleSearchCustomerAction(search);
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                set({
                    dataList: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                dataList: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isLoading: false,
            });
        }
    }, 
    getScheduleOfCustomerDataList: async () => {
        set({ isLoading: true });
            try {
                const res = await _scheduleOfCustomerIndexAction();
                if (res && res.data && res.meta && res.links) {
                    set({
                        dataList: res.data,
                        meta: res.meta,
                        links: res.links,
                        isLoading: false,
                    });
                } else {
                    set({
                        dataList: Array.isArray(res) ? res : res.data || [],
                        meta: res.meta || MetaEntity,
                        links: res.links || MetaLinksEntity,
                        isLoading: false,
                    });
                }
            } catch (error) {
                console.error(`Error: ${error}`);
                set({
                    dataList: [],
                    meta: MetaEntity,
                    links: MetaLinksEntity,
                    isLoading: false,
                });
            }
    },
    getScheduleOfRecyclerDataList: async () => {
        set({ isLoading: true });
            try {
                const res = await _scheduleOfRecyclerIndexAction();
                if (res && res.data && res.meta && res.links) {
                    set({
                        dataList: res.data,
                        meta: res.meta,
                        links: res.links,
                        isLoading: false,
                    });
                } else {
                    set({
                        dataList: Array.isArray(res) ? res : res.data || [],
                        meta: res.meta || MetaEntity,
                        links: res.links || MetaLinksEntity,
                        isLoading: false,
                    });
                }
            } catch (error) {
                console.error(`Error: ${error}`);
                set({
                    dataList: [],
                    meta: MetaEntity,
                    links: MetaLinksEntity,
                    isLoading: false,
                });
            }
    },
    getSearchScheduleRecyclerDataList: async (search) => {
        set({ isLoading: true });
        try {
            const res = await _scheduleSearchRecyclerAction(search);
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                set({
                    dataList: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                dataList: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isLoading: false,
            });
        }
    },
    getScheduleData: async (id) => {
        set({ isLoading: true });
            try {
                const res = await _scheduleViewAction(id);
                if (res && res.data) {
                    set({
                        data: res.data,
                        preData: res.data,
                        isLoading: false,
                    });
                } else {
                    set({
                        isLoading: false,
                    });
                }
            } catch (error) {
                console.error(`Error: ${error}`);
                set({
                    isLoading: false,
                });
            }
    },
    getSearchScheduleByCustomerDataList: async (search) => {
         set({ isLoading: true });
        try {
            const res = await _scheduleByCustomerSearchAction(search);
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                set({
                    dataList: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                dataList: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isLoading: false,
            });
        }
    }
})) 