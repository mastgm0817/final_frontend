import axios from "axios";
import { getSession } from "next-auth/react";
const URL = process.env.NEXT_PUBLIC_URL;
const API_URL = `${URL}/predict`;

async function setHeader() {
  const session = await getSession();
  const token = session?.user.id as string;
  console.log(token)
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': `Bearer ${token}`
  };
}
export const predict = async (formData: any) => {
  const headers = await setHeader(); 
  const response = await axios.post(API_URL, JSON.stringify(formData), {
    headers: headers
  })
  return response.data;
};
export default predict;
