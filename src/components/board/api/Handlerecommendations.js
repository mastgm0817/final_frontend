import axios from "axios";

const HandleRecommendations = async (board) => {
    // const BoardId=Board.bid;
    // console.log(board);
    try {
      const response = await axios.put(`/api/boards/${board}/recommend`, {
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

export default HandleRecommendations;