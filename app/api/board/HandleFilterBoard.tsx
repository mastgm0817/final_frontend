import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_URL;
export default async function HandleFilterBoard(requester: String) {
  try {
    const response = await axios.put(
      `${API_URL}/boards/myboard/${requester}`,
      requester,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    console.log("Board updated:", response.data);
  } catch (error) {
    console.error("Error updating Board:", error);
    throw error;
  }
}
