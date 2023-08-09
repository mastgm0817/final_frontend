'use client'
import React, { useState, useEffect, useCallback, FC } from 'react';

import Board from '../../../types/board';
import SendData from '../../api/board/SendData';
import WriteBoard from '../../../components/WriteBoard';
import BoardDetail from '../../../components/BoardDetail';
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'


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


const board1:Board = {
  bid: 3,
  nickName: " dafsdf",
  b_title: " weaff",
  b_content: " wefakidhfieorpfoaeirhpoiqerhkjadfnhligserhpgsuidfgosdjbgo;eir;sgoidhfrgosiehrosidhfogihae;roisghpdofighspdiorfhsdoihrfgos;dirh;sgdosd",
  b_createdAt: " fasdfas",
  b_updatedAt: "",
  b_views: 0,
  comments: 0,
  b_recommendations: 0,

}


const board2:Board = {
  bid: 2,
  nickName: " dafsdf",
  b_title: " weaff",
  b_content: " wefasd",
  b_createdAt: " fasdfas",
  b_updatedAt: "",
  b_views: 0,
  comments: 0,
  b_recommendations: 0,

}


interface pageProps{
  params:{pagenum:number}
}

const Page:FC<pageProps> = ({params}, props:any) => {

  const [boards, setBoards] = useState<Board[]|any>([]);
  const [UpdateFormClass, setUpdateFormClass] = useState<string | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const [selectedBoard, setSelectedBoard] = useState<Board>(defaultBoard); //선택된 board
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commentListShow, setCommentListShow] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await SendData("GET", `/api/boards/page/${params.pagenum}`, null, "fetch boards");
      setBoards(response);
      setIsLoading(false);
      // console.log(response)
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  }, [params.pagenum]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // const boards=[board1,board2];
  // console.log(selectedBoard)

  async function HandleBoardClick(event: any, clickedBoard: Board) {

    if (selectedBoard === null || selectedBoard.bid !== clickedBoard.bid) {
      setSelectedBoard(clickedBoard);
      await SendData("GET", `/api/boards/${clickedBoard.bid}`,null,"view");
      fetchData();
      console.log(clickedBoard.bid + "번 게시글 조회됨");
    } else if ( selectedBoard !== null && selectedBoard.bid === clickedBoard.bid ) {
      setSelectedBoard(defaultBoard);
      setCommentListShow(false);

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
    setTimeout(()=>{setShowUpdateForm(false)}, 290);
  }
  function ToggleUpdateForm(board: Board) {
    setSelectedBoard((prevState) => {
      if (UpdateFormClass === "formOn") {
        setUpdateFormClass("formOff");
        setTimeout(()=>{setShowUpdateForm(false)}, 290);
        return defaultBoard;
      } else {
        setShowUpdateForm(true);
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
    <>
    <div className="flex flex-col space-y-0">
      {boards && boards.map((board: Board) => (
        <React.Fragment key={board.bid}>
          <div 
            onClick={(event) => HandleBoardClick(event, board)} 
            className={`cursor-pointer max-w-4xl w-full bg-white rounded-lg p-4 flex items-center justify-between ${selectedBoard && selectedBoard.bid === board.bid ? 'text-pink-500' : ''}`}>
            
            <div className="w-1/12 text-center">{board.bid}</div>
            <div className="w-4/12 text-center">{board.b_title}</div>
            <div className="w-2/12 text-center">{board.b_createdAt.toLocaleString()}</div>
            <div className="w-2/12 text-center">{board.nickName}</div>
            <div className="w-1/12 text-center">{board.b_recommendations}</div>
            <div className="w-1/12 text-center">{board.b_views}</div>
          </div>
          <div 
            className={`board-detail flex ${selectedBoard && selectedBoard.bid === board.bid ? 'active' : ''}`}>
            <BoardDetail
              userName={props.userName}
              selectedBoard={board}
              ToggleUpdateForm={() => ToggleUpdateForm(board)}
              DeleteBoard={DeleteBoard}
              HandleRecommendButton={HandleRecommendButton}
              commentListShow={false}
              setCommentListShow={setCommentListShow}
            />
          </div>

          
        </React.Fragment>
      ))}
  
    </div>
      {UpdateFormClass && showUpdateForm &&(

        <WriteBoard
          board={{ ...selectedBoard }}
          FormTitle="게시글 수정"
          handleXButton={handelUpdateXButton}
          formClass={UpdateFormClass}
          BoardComplete={UpdateBoard}
        />
      )}
    </>


  );
}

export default Page;