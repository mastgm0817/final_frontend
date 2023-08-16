import axios from "axios";
import { useSession } from "next-auth/react";

console.log(useSession)
const URL = process.env.NEXT_PUBLIC_URL;
const API_URL = `${URL}/counter`;

export const counter = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
export default counter;
