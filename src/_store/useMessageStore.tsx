"use client"
import { _messageListAction, _messagePaginateAction, _messageSearchAction, _messageViewAction } from "@/_actions/MessageActions";
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface } from "@/_data/entity/ResponseEntity";
import { MessageEntity, MessageInterface } from "@/_data/entity/MessageEntity";
import { create } from "zustand";



interface DataListInterface{
    meta: MetaInterface,
    links: MetaLinksInterface
    data: MessageInterface[]
}


interface MessageStoreInterface{
    data: MessageInterface,
    preData: MessageInterface,
    dataList: MessageInterface[],
    message: string,
    errors: MessageInterface,
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
    setData: (data: MessageInterface) => void,
    setMessage: (i: string) => void,
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setIsSubmitting: (status: boolean) => void,
    setDelete: (id: number | string) => void,
    setUpdate: (id: number | string) => void,
    setError: (field: keyof MessageInterface, message: string) => void,
    setStore: (data: MessageInterface) => void,
    validateField: (title: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: MessageInterface },
    clearErrors: () => void,
    getData: (id: string | number) => void,
    getDataList: () => Promise<void>,
    getPaginatedDataList: (url: string) => Promise<void>,
    getSearchDataList: (search: string) => void,
    resetData: () => void
}

export const useMessageStore = create<MessageStoreInterface>((set, get) => ({
    data: MessageEntity,
    preData: MessageEntity,
    message: "",
    errors: MessageEntity,
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
    validateField: (title, value) => {
        let error = ""
        switch(title){
            case "email":
                if(!value.trim()) {
                    error = "Email is required.";
                }
                break;
            case "title":
                if(!value.trim()) {
                    error = "Title is required.";
                }
                break;
            case "message":
                if(!value.trim()) {
                    error = "Message is required.";
                }
                break;
            default:
                break;
        }
        return error
    },
    validateForm: () => { 
        const { data } = get();
        let errors = { ...MessageEntity };
        let hasError = false;
        // Validate title
        const emailError = get().validateField("email", data.email);
        if (emailError) {
            errors.email = emailError;
            hasError = true;
        }
        // Validate PHONE
        const messageError = get().validateField("message", data.message);
        if (messageError) {
            errors.message = messageError;
            hasError = true;
        }
        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    },
    clearErrors: () => {
        set({ errors: MessageEntity })
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
            const res = await _messageListAction();
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
            const res = await _messageViewAction(id);
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
                    data: MessageEntity,
                    preData: MessageEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: MessageEntity,
                preData: MessageEntity,
                isLoading: false,
            });
        }
    },
    getPaginatedDataList: async (url) => {
        set({ isLoading: true });
        try {
            const res = await _messagePaginateAction(url);
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
            const res = await _messageSearchAction(search);
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
    resetData: () => {
        set({
            data: MessageEntity,
        })
    },

})) 