import axios from "axios"

// const baseUrl = "https://food-service-cyan.vercel.app"
// const baseUrl = "http://localhost:3000"
const baseUrl = "https://food-backend-8ud7.onrender.com"

export const getOdrersReq = async (page:number, date:{from:Date | null, to:Date | null}) => {
    try {
        const token = localStorage.getItem("token")
        if (!date.from || !date.to) return null
        const response = await axios.get(`${baseUrl}/foodorder/admin/${page}`,{
            headers : {
                Authorization : token
            },
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
        const token = localStorage.getItem('token')
        const response = await axios.put(`${baseUrl}/foodorder/${orderId}`,{status:status}, {
            headers: {
                Authorization : token
            }
        })
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
    }
}

export const chaneManyStatus = async (checkedOrders: string[], status:string) => {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.put(`${baseUrl}/foodorder`, {ids : checkedOrders, status : status}, {
            headers : {
                Authorization : token
            }
        })
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
    }
}