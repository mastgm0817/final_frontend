"use client";
import React, { useState, useEffect, useCallback, FC} from "react";
import Board from "../../../types/board";
import SendData from "../../api/board/SendData";
import { ISODateString } from "next-auth";

import Loading from "../../../components/board/Loading";
import BoardDetail from "../../../components/board/BoardDetail";
import WriteBoard from "../../../components/board/WriteBoard";


const defaultBoard: Board = {
  bid: 0,
  nickName: " ",
  btitle: " ",
  bcontent: " ",
  b_createdAt: " ",
  b_updatedAt: "",
  b_views: 0,
  comments: 0,
  commentList:[],
  b_recommendations: 0,
};


//=======================================================================
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
  // const [isNextExist, setisNextExist]=

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
  const fetchBoard = useCallback(async (bid:any) => {
    try {
        const response = await SendData("GET", `/boards/${bid}`, null, "fetch one board");
        setSelectedBoard(response);
    } catch (error) {
        console.error("Error fetching board:", error);
    }
    }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData, params.findingMethod, params.findStr]);

  async function HandleBoardClick(event: any, clickedBoard: Board) {
    if (selectedBoard === null || selectedBoard.bid !== clickedBoard.bid) {
      setSelectedBoard(clickedBoard);
      await SendData("GET", `/boards/${clickedBoard.bid}`, null, "view");
      fetchBoard(clickedBoard.bid);
      console.log(clickedBoard.bid + "번 게시글 조회됨");
      setShowUpdateForm(false);
      setCommentListShow(false);
    } else if (
      selectedBoard !== null &&
      selectedBoard.bid === clickedBoard.bid
    ) {
      setSelectedBoard(defaultBoard);
      setCommentListShow(false);
      setShowUpdateForm(false);
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
  function formatDate(dateString:ISODateString) {
    const dateObj = new Date(dateString);
    
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0 indexed
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    return `${month}/${day} ${hours}:${minutes}`;
}

  return (
    <>
    {isLoading&&
      <Loading />
    }
    
    {!isLoading &&
    <div>
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
                <div className="w-4/12 text-center flex items-center justify-center"><span className=" hover:underline">{board.btitle} </span>
                          {board.commentList.length!=0 && <div className="text-xs text-pink-700 ml-3 hover:none">{board.commentList.length}</div>}</div>
                <div className="w-2/12 text-center">
                  {formatDate(board.b_createdAt.toLocaleString())}
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
                { selectedBoard && selectedBoard.bid === board.bid &&
                <>
                  {UpdateFormClass && showUpdateForm && (
                    <WriteBoard
                      board={{ ...selectedBoard }}
                      FormTitle="게시글 수정"
                      handleXButton={handelUpdateXButton}
                      formClass={UpdateFormClass}
                      BoardComplete={UpdateBoard}
                    />
                  )}
                <BoardDetail
                  showUpdateForm={showUpdateForm}
                  formatDate={formatDate}
                  userName={props.userName}
                  selectedBoard={board}
                  ToggleUpdateForm={() => ToggleUpdateForm(board)}
                  DeleteBoard={DeleteBoard}
                  HandleRecommendButton={HandleRecommendButton}
                  commentListShow={false}
                  setCommentListShow={setCommentListShow}
                />
              </>}
              </div>
            </React.Fragment>
          ))}

          {/* {(boards===[]) && <div>찾으시는 게시글이 없습니다.</div>} */}
      </div></div>}
    </>
  );
};

export default Page;
