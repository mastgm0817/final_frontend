import Board from "@/types/board";
import axios from "axios";

const IncreaseViewCount = async (board:Board) => {
  const BoardIdString = board.bid.toString();
  // console.log(BoardIdString+"조회수증가해야됨!!!");
    try {
      const response = await axios.get(`http://localhost:8080/api/boards/${BoardIdString}`);
      return response.data;
    } catch (error) {
      console.error('Failed to increase view count:', error);
      throw error;
    }
  };

export default IncreaseViewCount;