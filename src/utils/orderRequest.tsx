import axios from "axios"

const baseUrl = "https://food-service-cyan.vercel.app"

export const getOdrersReq = async (page:number, date:{from:Date, to:Date}) => {
    try {
        const response = await axios.get(`${baseUrl}/foodorder/admin/${page}`,{
            params: {
                startDate: date.from.toISOString(),
                endDate: date.to.toISOString(),
            }
        })
        console.log(response);
        return {
            orders: response.data.data,
            totalPages: response.data.totalPage,
            totalResults: response.data.totalResults,
        }
    } catch (error) {
        console.log(error);
    }

}

export const changeStatus = async (orderId:string, status : string) => {
    try {
        const response = await axios.put(`${baseUrl}/foodorder/${orderId}`,{status:status})
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const chaneManyStatus = async (checkedOrders: string[], status:string) => {
    try {
        const res = await axios.put(`${baseUrl}/foodorder`, {ids : checkedOrders, status : status})
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
    }
}