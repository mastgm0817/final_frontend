import axios from "axios";

const IncreaseViewCount = async (pid) => {
    try {
      const response = await axios.get(`/api/posts/${pid}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
      return response.data;
    } catch (error) {
      console.error('Failed to increase view count:', error);
      throw error;
    }
  };

export default IncreaseViewCount;