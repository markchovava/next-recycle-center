export interface FaqInterface {
    id: number,
    userId: number,
    question: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
}


export const FaqEntity = {
    id: 0,
    userId: 0,
    question: "",
    answer: "",
    createdAt: "",
    updatedAt: "",
}