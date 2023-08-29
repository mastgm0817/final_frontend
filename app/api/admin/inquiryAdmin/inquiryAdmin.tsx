import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_URL;
const API_URL = URL + "/admin";

export const getAllInquiry = async (token:any) => {

    const response = await axios.get(`${API_URL}/getAllInquiry`,{
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`,
        }
    })
    return response.data;
}

export const createResponse = async (inquiryId: number, responseRequest: any, token:any) => {
    try {
        const response = await axios.post(`${API_URL}/inquiry/${inquiryId}/response`, JSON.stringify(responseRequest),{
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};