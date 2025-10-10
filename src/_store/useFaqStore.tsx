"use client"
import { _faqListAction, _faqPaginateAction, _faqSearchAction, _faqViewAction } from "@/_actions/FaqActions";
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface } from "@/_data/entity/ResponseEntity";
import { FaqEntity, FaqInterface } from "@/_data/entity/FaqEntity";
import { create } from "zustand";



interface DataListInterface{
    meta: MetaInterface,
    links: MetaLinksInterface
    data: FaqInterface[]
}

interface FaqStoreInterface{
    data: FaqInterface,
    preData: FaqInterface,
    dataList: FaqInterface[],
    message: string,
    errors: FaqInterface,
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
    setData: (data: FaqInterface) => void,
    setMessage: (i: string) => void,
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setIsSubmitting: (status: boolean) => void,
    setDelete: (id: number | string) => void,
    setUpdate: (id: number | string) => void,
    setError: (field: keyof FaqInterface, message: string) => void,
    setStore: (data: FaqInterface) => void,
    validateField: (question: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: FaqInterface },
    clearErrors: () => void,
    getData: (id: string | number) => void,
    getDataList: () => Promise<void>,
    getPaginatedDataList: (url: string) => Promise<void>,
    getSearchDataList: (search: string) => void,
    resetData: () => void
}

export const useFaqStore = create<FaqStoreInterface>((set, get) => ({
    data: FaqEntity,
    preData: FaqEntity,
    message: "",
    errors: FaqEntity,
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
    validateField: (question, value) => {
        let error = ""
        switch(question){
            case "question":
                if(!value.trim()) {
                    error = "Question is required.";
                }
                break;
            case "answer":
                if(!value.trim()) {
                    error = "Answer is required.";
                }
                break;
            default:
                break;
        }
        return error
    },
    validateForm: () => { 
        const { data } = get();
        let errors = { ...FaqEntity };
        let hasError = false;
        // Validate question
        const questionError = get().validateField("question", data.question);
        if (questionError) {
            errors.question = questionError;
            hasError = true;
        }
        // Validate PHONE
        const answerError = get().validateField("answer", data.answer);
        if (answerError) {
            errors.answer = answerError;
            hasError = true;
        }
        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    },
    clearErrors: () => {
        set({ errors: FaqEntity })
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
            const res = await _faqListAction();
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
            const res = await _faqViewAction(id);
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
                    data: FaqEntity,
                    preData: FaqEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: FaqEntity,
                preData: FaqEntity,
                isLoading: false,
            });
        }
    },
    getPaginatedDataList: async (url) => {
        set({ isLoading: true });
        try {
            const res = await _faqPaginateAction(url);
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
            const res = await _faqSearchAction(search);
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
            data: FaqEntity,
        })
    },

})) 