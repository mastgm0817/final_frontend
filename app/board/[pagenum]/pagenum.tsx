'use client'
import React, { useState, useEffect, FC } from 'react';

import Board from '../../../types/board';
import SendData from '../../api/board/SendData';
import WriteBoard from '../../../components/WriteBoard';
import BoardDetail from '../../../components/BoardDetail';

const defaultBoard: Board = {
  bid: 0,
  nickName: " ",
  b_title: " ",
  b_content: " ",
  b_createdAt: " ",
  b_updatedAt: "",
  b_views: 0,
  comments: 0,
  b_recommendations: 0,
};

interface pageProps{
  params:{pagenum:number}
}

const Page:FC<pageProps> = ({params}, props:any) => {

  const [boards, setBoards] = useState<Board[]|any>([]);
  const [UpdateFormClass, setUpdateFormClass] = useState<string | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<Board>(defaultBoard); //선택된 board
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await SendData("GET", `/api/boards/page/${params.pagenum}`,null,"fetch boards");
      setBoards(response);
      setIsLoading(false);
      console.log(response)
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [params.pagenum]);

  async function HandleBoardClick(event: any, clickedBoard: Board) {

    if (selectedBoard === null || selectedBoard.bid !== clickedBoard.bid) {
      setSelectedBoard(clickedBoard);
      await SendData("GET", `/api/boards/${clickedBoard.bid}`,null,"view");
      fetchData();
      console.log(clickedBoard.bid + "번 게시글 조회됨");
    } else if ( selectedBoard !== null && selectedBoard.bid === clickedBoard.bid ) {
      setSelectedBoard(defaultBoard);
    }
  }
  async function UpdateBoard(UpdateBoard: Board) {
    UpdateBoard.b_updatedAt = new Date().toISOString();
    await SendData("PUT", `/api/boards/${UpdateBoard.bid}`,UpdateBoard,"update");
    setSelectedBoard(defaultBoard);
    setUpdateFormClass("formOff");
    fetchData();
  }
  async function DeleteBoard(board: Board) {
    await SendData("DELETE", `/api/boards/${board.bid}`,board,"delete");
    fetchData();
  }
  function handelUpdateXButton() {
    setSelectedBoard(defaultBoard);
    setUpdateFormClass("formOff");
  }
  function ToggleUpdateForm(board: Board) {
    setSelectedBoard((prevState) => {
      if (UpdateFormClass === "formOn") {
        setUpdateFormClass("formOff");
        return defaultBoard;
      } else {
        setUpdateFormClass("formOn");
        return board;
      }
    });
  }
  async function HandleRecommendButton(bid:any) {
    await SendData("PUT", `/api/boards/${bid}/recommend`,null,"recommend");
    fetchData();
  }
  

  return (
    <div>
      
      {boards &&
        boards.map((board:Board) => (
          <React.Fragment key={board.bid}>
            <div onClick={(event) => HandleBoardClick(event, board)}>
              <div>
                <div>{board.bid} {board.b_title} {board.b_createdAt.toLocaleString()} {board.nickName} {board.b_recommendations.toLocaleString()} {board.b_views.toLocaleString()}</div>
              </div>
            </div>
  
            <br></br>
            <div className={selectedBoard && selectedBoard.bid === board.bid ? "active" : ""}>
              {selectedBoard && selectedBoard.bid === board.bid && <BoardDetail
                userName={props.userName}
                selectedBoard={board}
                ToggleUpdateForm={() => ToggleUpdateForm(board)}
                DeleteBoard={DeleteBoard}
                HandleRecommendButton={HandleRecommendButton}
              />}
            </div>
          </React.Fragment>
        ))}
  
      {UpdateFormClass && (
        <WriteBoard
          board={{ ...selectedBoard }}
          FormTitle="게시글 수정"
          handleXButton={handelUpdateXButton}
          formClass={UpdateFormClass}
          BoardComplete={UpdateBoard}
        />
      )}
    </div>

  );
}

export default Page;