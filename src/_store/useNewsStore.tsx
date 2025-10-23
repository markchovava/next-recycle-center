import { _newsDeleteAction, _newsStoreAction, _newsListAction, _newsPaginateAction, _newsSearchAction, _newsViewAction, _newsUpdateAction } from "@/_actions/NewsActions";
import { BaseURL } from "@/_api/BaseURL";
import { NewsEntity, NewsInterface } from "@/_data/entity/NewsEntity";
import { MetaEntity, MetaInterface, MetaLinksEntity, MetaLinksInterface } from "@/_data/entity/ResponseEntity";
import { create } from "zustand";


interface DataListInterface{
    meta: MetaInterface,
    links: MetaLinksInterface
    data: NewsInterface[]
}


interface NewsStoreInterface{
    data: NewsInterface,
    preData: NewsInterface,
    message: string,
    errors: Partial<Record<keyof NewsInterface, string>>,
    isLoading: boolean,
    dataList: NewsInterface[],
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
    setData: (data: NewsInterface) => void,
    getData: (id: string | number) => void,
    setMessage: (i: string) => void,
    setSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setIsSubmitting: (status: boolean) => void,
    setDelete: (id: number | string) => Promise<void>,
    setUpdate: (id: number | string) => Promise<void>,
    setStore: (data: NewsInterface) => Promise<void>,
    validateField: (name: string, value: string) => string,
    validateForm: () => { isValid: boolean; errors: Partial<Record<keyof NewsInterface, string>> },
    clearErrors: () => void,
    resetData: () => void,
    setError: (field: keyof NewsInterface, message: string) => void,
    getDataList: () => Promise<void>,
    getPaginatedDataList: (url: string) => Promise<void>,
    setImageFile: (file: File | null) => void,
    setNewImageFile: (file: File | null) => void,
    getSearchDataList: (search: string) => void,
    getSearchPriorityStatusDataList: (search: string) => Promise<void>
}


export const useNewsStore = create<NewsStoreInterface>((set, get) =>({
    data: NewsEntity,
    preData: NewsEntity,
    message: "",
    errors: {},
    meta: MetaEntity,
    links: MetaLinksEntity,
    isLoading: true,
    isSearching: false,
    search: "",
    isSubmitting: false,
    dataList: [],
    // Actions
    setMessage: (msg) => {
        set({ message: msg })
    },
    resetData: () => {
        set({
            data: NewsEntity,
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
        set({ search: value })
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
            case "title":
                if(!value.trim()) {
                    error = "Title is required.";
                }
                break;
            case "content":
                if(!value.trim()) {
                    error = "Content is required.";
                }
                break;
            case "status":
                if (!value.trim()) {
                    error = "Status is required.";
                }
                break;
            default:
                break;
        }
        return error
    },
    validateForm: () => { 
        const { data } = get();
        let errors: Partial<Record<keyof NewsInterface, string>> = {};
        let hasError = false;
        
        // Validate title
        const titleError = get().validateField("title", data.title);
        if (titleError) {
            errors.title = titleError;
            hasError = true;
        }
        
        // Validate content
        const contentError = get().validateField("content", data.content);
        if (contentError) {
            errors.content = contentError;
            hasError = true;
        }
        
        // Validate status
        const statusError = get().validateField("status", data.status);
        if (statusError) {
            errors.status = statusError;
            hasError = true;
        }

        
        set({ errors });
        return {
            isValid: !hasError,
            errors
        };
    }, 
    clearErrors: () => {
        set({ errors: {} })
    },   
    setError: (field, message) => {
        set((state) => ({
            errors: {
                ...state.errors,
                [field]: message
            }
        }));
    },
    setDelete: async (id) => {
        set({ isSubmitting: true });
        try {
            const res = await _newsDeleteAction(id);
            if (res.success) {
                // Remove the deleted item from dataList
                set((state) => ({
                    dataList: state.dataList.filter(item => item.id !== id),
                    message: res.message || "News deleted successfully",
                    isSubmitting: false,
                }));
            } else {
                set({
                    message: res.message || "Failed to delete news",
                    isSubmitting: false,
                });
            }
        } catch (error) {
            console.error(`Error deleting news: ${error}`);
            set({
                message: "An error occurred while deleting news",
                isSubmitting: false,
            });
        }
    },
    setUpdate: async (id) => {
        const { data } = get();
        const validation = get().validateForm();
        
        if (!validation.isValid) {
            return;
        }
        
        set({ isSubmitting: true });
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("content", data.content);
            formData.append("author", data.author);
            formData.append("priority", String(data.priority));
            formData.append("status", data.status);
            
            if (data.newImage) {
                formData.append("image", data.newImage);
            }
            
            const res = await _newsUpdateAction(id, formData);
            
            if (res.success) {
                set({
                    data: res.data || data,
                    preData: res.data || data,
                    message: res.message || "News updated successfully",
                    isSubmitting: false,
                    errors: {},
                });
                
                // Update the item in dataList
                set((state) => ({
                    dataList: state.dataList.map(item => 
                        item.id === id ? (res.data || data) : item
                    ),
                }));
            } else {
                set({
                    message: res.message || "Failed to update news",
                    errors: res.errors || {},
                    isSubmitting: false,
                });
            }
        } catch (error) {
            console.error(`Error updating news: ${error}`);
            set({
                message: "An error occurred while updating news",
                isSubmitting: false,
            });
        }
    },
    setStore: async (data) => {
        const validation = get().validateForm();
        
        if (!validation.isValid) {
            return;
        }
        
        set({ isSubmitting: true });
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("content", data.content);
            formData.append("author", data.author);
            formData.append("priority", data.priority.toString());
            formData.append("status", data.status);
            
            if (data.newImage) {
                formData.append("image", data.newImage);
            }
            
            const res = await _newsStoreAction(formData);
            
            if (res.success) {
                set({
                    data: NewsEntity,
                    message: res.message || "News created successfully",
                    isSubmitting: false,
                    errors: {},
                });
                
                // Add the new item to dataList
                if (res.data) {
                    set((state) => ({
                        dataList: [res.data, ...state.dataList],
                    }));
                }
            } else {
                set({
                    message: res.message || "Failed to create news",
                    errors: res.errors || {},
                    isSubmitting: false,
                });
            }
        } catch (error) {
            console.error(`Error creating news: ${error}`);
            set({
                message: "An error occurred while creating news",
                isSubmitting: false,
            });
        }
    },
    getDataList: async () => {
        set({ isLoading: true });
        try {
            const res = await _newsListAction();
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
    getData: async (id) => {
        set({ isLoading: true });
        try {
            const res = await _newsViewAction(id);
            if (res && res.data) {
                set({
                    data: res.data,
                    preData: res.data,
                    isLoading: false,
                });
                if(res.data.image){
                    const img = BaseURL + res.data.image
                    set((state) => ({
                        data: {...state.data, imagURL: img},
                        preData: {...state.data, imageURL: img}
                    }))
                }
            } else {
                set({
                    data: NewsEntity,
                    preData: NewsEntity,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            set({
                data: NewsEntity,
                preData: NewsEntity,
                isLoading: false,
            });
        }
    }, 
    getPaginatedDataList: async (url) => {
        set({ isLoading: true });
        try {
            const res = await _newsPaginateAction(url);
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
    getSearchDataList: async (search) => {
        set({ isSearching: true });
        try {
            const res = await _newsSearchAction(search);
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isSearching: false,
                });
            } else {
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
    getSearchPriorityStatusDataList: async (search) => {
        set({ isSearching: true });
        try {
            const res = await _newsSearchAction(search);
            if (res && res.data && res.meta && res.links) {
                set({
                    dataList: res.data,
                    meta: res.meta,
                    links: res.links,
                    isSearching: false,
                });
            } else {
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