import axios from 'axios';
import Board from '@/types/board';
// import { useState } from 'react';


const HandleUpdateBoard = async (board:Board) => {
    const BoardId=board.bid;
    board.b_updatedAt = new Date().toISOString();

    try {
        const response = await axios.put(`http://localhost:8080/api/boards/${BoardId}`, board, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        console.log('Board updated:', response.data);
    } catch (error) {
        console.error('Error updating Board:', error);
        throw error;
    }


};

export default HandleUpdateBoard;