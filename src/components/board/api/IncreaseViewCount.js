import axios from "axios";

const IncreaseViewCount = async (BoardId) => {
  const BoardIdString = BoardId.toString();
    try {
      const response = await axios.get(`/api/boards/${BoardIdString}`);
      return response.data;
    } catch (error) {
      console.error('Failed to increase view count:', error);
      throw error;
    }
  };

export default IncreaseViewCount;