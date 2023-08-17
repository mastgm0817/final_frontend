"use client";
import React, { useState, useEffect, useCallback, FC } from "react";
import Board from "../../../types/board";
import SendData from "../../api/board/SendData";
import WriteBoard from "../../../components/WriteBoard";
import BoardDetail from "../../../components/BoardDetail";

const defaultBoard: Board = {
  bid: 0,
  nickName: " ",
  btitle: " ",
  bcontent: " ",
  b_createdAt: " ",
  b_updatedAt: "",
  b_views: 0,
  comments: 0,
  b_recommendations: 0,
};

interface pageProps {
  params: { pagenum: number, findStr: string, findingMethod: string;};
  
}

const Page: FC<pageProps> = ({ params }, props: any) => {
  const [boards, setBoards] = useState<Board[] | any>([]);
  const [UpdateFormClass, setUpdateFormClass] = useState<string | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const [selectedBoard, setSelectedBoard] = useState<Board>(defaultBoard); //선택된 board
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commentListShow, setCommentListShow] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await SendData(
        "GET",
        `/boards/page/${params.pagenum}?findingMethod=${params.findingMethod}&findStr=${params.findStr}`,
        null,
        "fetch boards"
      );
      setBoards(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  }, [params.pagenum, params.findingMethod, params.findStr]);
  useEffect(() => {
    fetchData();
  }, [fetchData, params.findingMethod, params.findStr]);
  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);


  
  // const boards=[board1,board2];
  // console.log(selectedBoard)
  
  // async function SearchBoard(findingMethod:string, findStr:string) {
  //   await SendData("GET",`/boards/page/${params.pagenum}/?findingMethod=${findingMethod}&findStr=${findStr}`,null,"search");
  // }
  async function HandleBoardClick(event: any, clickedBoard: Board) {
    if (selectedBoard === null || selectedBoard.bid !== clickedBoard.bid) {
      setSelectedBoard(clickedBoard);
      await SendData("GET", `/boards/${clickedBoard.bid}`, null, "view");
      fetchData();
      console.log(clickedBoard.bid + "번 게시글 조회됨");
    } else if (
      selectedBoard !== null &&
      selectedBoard.bid === clickedBoard.bid
    ) {
      setSelectedBoard(defaultBoard);
      setCommentListShow(false);
    }
  }
  async function UpdateBoard(UpdateBoard: Board) {
    UpdateBoard.b_updatedAt = new Date().toISOString();
    await SendData("PUT", `/boards/${UpdateBoard.bid}`, UpdateBoard, "update");
    setSelectedBoard(defaultBoard);
    setUpdateFormClass("formOff");
    fetchData();
  }
  async function DeleteBoard(board: Board) {
    await SendData("DELETE", `/boards/${board.bid}`, board, "delete");
    fetchData();
  }
  function handelUpdateXButton() {
    setSelectedBoard(defaultBoard);
    setUpdateFormClass("formOff");
    setTimeout(() => {
      setShowUpdateForm(false);
    }, 290);
  }
  function ToggleUpdateForm(board: Board) {
    setSelectedBoard((prevState) => {
      if (UpdateFormClass === "formOn") {
        setUpdateFormClass("formOff");
        setTimeout(() => {
          setShowUpdateForm(false);
        }, 290);
        return defaultBoard;
      } else {
        setShowUpdateForm(true);
        setUpdateFormClass("formOn");
        return board;
      }
    });
  }
  async function HandleRecommendButton(bid: any) {
    await SendData("PUT", `/boards/${bid}/recommend`, null, "recommend");
    fetchData();
  }

  return (
    <>
      <div className=" space-y-0">
        {boards &&
          boards.map((board: Board) => (
            <React.Fragment key={board.bid}>
              <div
                onClick={(event) => HandleBoardClick(event, board)}
                className={`cursor-pointer max-w-4xl w-full bg-white rounded-lg p-4 flex items-center justify-between ${
                  selectedBoard && selectedBoard.bid === board.bid
                    ? "text-pink-500"
                    : ""
                }`}
              >
                <div className="w-1/12 text-center">{board.bid}</div>
                <div className="w-4/12 text-center">{board.btitle}</div>
                <div className="w-2/12 text-center">
                  {board.b_createdAt.toLocaleString()}
                </div>
                <div className="w-2/12 text-center">{board.nickName}</div>
                <div className="w-1/12 text-center">
                  {board.b_recommendations.toString()}
                </div>
                <div className="w-1/12 text-center">{board.b_views.toString()}</div>
              </div>
              <div
                className={`${
                  selectedBoard && selectedBoard.bid === board.bid
                    ? "board-detail active"
                    : "board-detail"
                }`}
              >
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
      {UpdateFormClass && showUpdateForm && (
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
};

export default Page;
