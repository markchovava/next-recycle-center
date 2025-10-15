export interface ScheduleInterface {
    id: number,
    createdAt: string,
    updatedAt: string,
    // --------- CENTER ------------
    centerId: string,
    centerName: string,
    centerPhone: string,
    centerAddress: string,
    // --------- CUSTOMER ------------
    customerId: number,
    customerName: string,
    customerAddress: string,
    customerPhone: string,
    requestTime: string,
    requestDate: string,
    customerStatus: string,
    // --------- RECYCLER ------------
    recyclerId: number,
    recyclerName: string,
    recyclerAddress: string,
    recyclerPhone: string,
    recyclerStatus: string,
    collectionDate: string,
    collectionTime: string,
}



export const ScheduleEntity = {
    id: 0,
    createdAt: "",
    updatedAt: "",
    // --------- CENTER ------------
    centerId: "",
    centerName: "",
    centerPhone: "",
    centerAddress: "",
    // --------- CUSTOMER ------------
    customerId: 0,
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    requestTime: "",
    requestDate: "",
    customerStatus: "",
    // --------- RECYCLER ------------
    recyclerId: 0,
    recyclerName: "",
    recyclerAddress: "",
    recyclerPhone: "",
    recyclerStatus: "",
    collectionDate: "",
    collectionTime: "",
}



export const ScheduleErrorEntity = {
    id: 0,
    createdAt: "",
    updatedAt: "",
    // --------- CENTER ------------
    centerId: "",
    centerName: "",
    centerPhone: "",
    centerAddress: "",
    // --------- CUSTOMER ------------
    customerId: 0,
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    requestTime: "",
    requestDate: "",
    customerStatus: "",
    // --------- RECYCLER ------------
    recyclerId: 0,
    recyclerName: "",
    recyclerAddress: "",
    recyclerPhone: "",
    recyclerStatus: "",
    collectionDate: "",
    collectionTime: "",
}

