import { _centerDeleteAction, _centerStoreAction, centerListAction, centerPaginateAction, centerSearchAction, centerViewAction } from "@/_actions/CenterActions";
import { CenterEntity, CenterInterface } from "@/_data/entity/CenterEntity";
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface, ResponseInterface } from "@/_data/entity/ResponseEntity";
import { create } from "zustand";


interface DataListInterface{
    meta: MetaInterface,
    links: MetaLinksInterface
    data: CenterInterface[]
}


interface CenterStoreInterface{
    data: CenterInterface,
    preData: CenterInterface,
    message: string,
    errors: CenterInterface,
    isLoading: boolean,
    dataList: CenterInterface[],
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
    setImage: (img: string) => void,
    setData: (data: CenterInterface) => void,
    getData: (id: string | number) => void,
    setMessage: (i: string) => void,
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setIsSubmitting: (status: boolean) => void,
    setDelete: (id: number | string) => void,
    setUpdate: (id: number | string) => void,
    setStore: (data: CenterInterface) => void,
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: CenterInterface },
    clearErrors: () => void,
    setError: (field: keyof CenterInterface, message: string) => void,
    getDataList: () => Promise<void>,
    getPaginatedDataList: (url: string) => Promise<void>,
    setImageFile: (file: File | null) => void,
    setNewImageFile: (file: File | null) => void,
    getSearchDataList: (search: string) => void,

}


export const useCenterStore = create<CenterStoreInterface>((set, get) =>({
    data: CenterEntity,
    preData: CenterEntity,
    message: "",
    errors: CenterEntity,
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
    setImage: (img) => {
        set((state) => ({
            data: {
                ...state.data,
                imageURL: img,
            },
            preData: {
                ...state.preData,
                imageURL: img
            }
        }))
    },
    setSearch: (e) => {
        const { value } = e.target;
        set({
            search: value
        })
    },
    setNewImageFile: (file) => {
        set((state) => ({
            data: {
                ...state.data, 
                newImage: file,
            }
        }))
    },
    setImageFile: (file) => {
        set((state) => ({
            data: {
                ...state.data, 
                image: file,
            }
        }))
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
        let errors = { ...CenterEntity };
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
        // Validate City
        const cityError = get().validateField("city", data.city);
        if (cityError) {
            errors.city = cityError;
            hasError = true;
        }
         // Validate Province
        const provinceError = get().validateField("province", data.province);
        if (provinceError) {
            errors.province = provinceError;
            hasError = true;
        }
        // Validate Description
        const descriptionError = get().validateField("description", data.description);
        if (descriptionError) {
            errors.description = descriptionError;
            hasError = true;
        }
       
        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    },
    clearErrors: () => {
        set({ errors: CenterEntity })
    },
    setError: (field, message) => {
        set((state) => ({
            errors: {
                ...state.errors,
                [field]: message
            }
        }));
    },
    setDelete: (id) => {},
    setUpdate: (id) => {},
    setStore: (data) => {},
    getDataList: async () => {
        set({ isLoading: true });
        try {
            const res = await centerListAction();
            // Check if response has the expected structure
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                // Fallback if structure is different
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
    getData: async (id) => {
        set({ isLoading: true });
        try {
            const res = await centerViewAction(id);
            // Check if response has the expected structure
            if (res && res.data ) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
            } else {
                // Fallback if structure is different
                set({
                    data: CenterEntity,
                    preData: CenterEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: CenterEntity,
                preData: CenterEntity,
                isLoading: false,
            });
        }
    },
    getPaginatedDataList: async (url) => {
        set({ isLoading: true });
        try {
            const res = await centerPaginateAction(url);
            // Check if response has the expected structure
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isLoading: false,
                });
            } else {
                // Fallback if structure is different
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
    getSearchDataList: async (search) => {
        set({ isSearching: true });
        try {
            const res = await centerSearchAction(search);
            // Check if response has the expected structure
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isSearching: false,
                });
            } else {
                // Fallback if structure is different
                set({
                    dataList: Array.isArray(res) ? res : res.data || [],
                    meta: res.meta || MetaEntity,
                    links: res.links || MetaLinksEntity,
                    isSearching: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                dataList: [],
                meta: MetaEntity,
                links: MetaLinksEntity,
                isSearching: false,
            });
        }
    },
   

}))