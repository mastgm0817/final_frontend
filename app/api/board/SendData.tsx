import axios from "axios";
import { getSession } from "next-auth/react";

async function setHeader() {
  const session = await getSession();
  const token = session?.user.id;
  console.log(token)
  return {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization : `Bearer ${token}`
  };
}

const API_URL = process.env.NEXT_PUBLIC_URL;

const SendData = async (
  method: string,
  sendurl: string,
  data: any,
  msg: string
) => {
    const headers = await setHeader();
    const targetURL = `${API_URL}` + sendurl;
  try {
    const response = await axios({ method, url: targetURL, data, headers });
    console.log(method, response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default SendData;