import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_URL;

const FetchComments = async (boardId: Number) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/boards/${boardId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Comment:", error);
    throw error;
  }
};

export default FetchComments;
