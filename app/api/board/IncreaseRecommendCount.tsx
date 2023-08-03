import Board from "@/types/board";
import axios from "axios";

const IncreaseRecommentCount = async (board:Board) => {
  const BoardIdString = board.bid.toString();
  // console.log(BoardIdString+"추천수증가해야됨!!!");
    try {
      const response = await axios.put(`http://localhost:8080/api/boards/${BoardIdString}/recommend`);
      return response.data;
    } catch (error) {
      console.error('Failed to increase recommend count:', error);
      throw error;
    }
  };

export default IncreaseRecommentCount;