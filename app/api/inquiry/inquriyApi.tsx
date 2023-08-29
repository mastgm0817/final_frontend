// api/inquiry.ts

import axios from 'axios';
const URL = process.env.NEXT_PUBLIC_URL;
const API_URL = URL + "/inquiry";

export const createInquiry = async (nickName: string, title: string, content: string, token:any) => {
    const inquiryDTO = {
        title,
        content
    };
    
    const response = await axios.post(`${API_URL}/${nickName}`, JSON.stringify(inquiryDTO), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
};


export const getMyInquiry = async (nickName:string, token:any) => {
    const response = await axios.get(`${API_URL}/${nickName}`,{
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`,
        }
    })
    return response.data;
};
