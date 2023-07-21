import axios from "axios";

const Handlerecommendations = async (BoardId) => {
  const BoardIdString = BoardId.toString();
    try {
      const response = await axios.get(`/api/boards/${BoardIdString}/recommend`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
      return response.data;
    } catch (error) {
      console.error('Failed to increase recommend count:', error);
      throw error;
    }
  };

export default Handlerecommendations;