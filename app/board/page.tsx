"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Board from "../../types/board";
import WriteBoard from "../../components/WriteBoard";
import SendData from "../api/board/SendData";
import Page from "./[pagenum]/pagenum";

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


function Logined(props: any): any {

  const { data: session } = useSession();
  const [boards, setBoards] = useState<Board[] | any>([]); //board목록
  const [AddFormClass, setAddFormClass] = useState<string | null>(null); //글추가폼의 class
  const [newBoard, CreateNewBoard] = useState<Board>({ ...defaultBoard }); //새로운 board
  const [pages, setPages] = useState<number>(0)
  
  const fetchData = async () => {
    try {
      const response = await SendData("GET", `/api/boards/page/0`,null,"fetch boards");
      setBoards(response);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  function ToggleAddForm(): any {
    if (AddFormClass === "formOn") {
      setAddFormClass("formOff");
    } else if (AddFormClass === "formOff") {
      setAddFormClass("formOn");
      CreateNewBoard(newBoard);
    } else {
      setAddFormClass("formOn");
    }
  }
  
  function handleAddXButton() {
    setAddFormClass("formOff");
  }
  
  async function CreateBoard(newBoard: Board) {
    newBoard.nickName = `${session ? session.user?.name : null}`;
    await SendData("POST", `/api/boards`,newBoard,"create");
    ToggleAddForm();
    fetchData();
  }
  

  if (session) {
    const userName = session.user?.name;
    return (
      <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4" onClick={() => setPages(0)}>게시판</h1>
          <br></br>
          {/* <button>내글보기</button> */}

        <div>
          <div className="w-96 bg-white shadow-lg rounded-lg p-4">
              <div className="flex justify-between items-center font-bold mb-4 border-b-2 pb-2" style={{padding:"10px"}}>
                No 제목 작성일자 작성자 추천수 조회수</div>
            <br></br>
          <Page params={{ pagenum: pages }} />
          </div>
        </div>
        <div className="flex mt-4 space-x-4">

          {pages>=1 && <button onClick={() => setPages(pages-1)}
                        className="text-xl">{pages-1}</button>}
          {pages>1 && <button onClick={() => setPages(pages-2)}
                        className="text-xl">{pages-2}</button>}
          <p className="bg-blue-500 text-white p-2 rounded">{pages}</p>
          <button onClick={() => setPages(pages+1)}
                        className="text-xl">{pages+1}</button>
          <button onClick={() => setPages(pages+2)}
                        className="text-xl">{pages+2}</button>
        </div>

        <div className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={ToggleAddForm}
          style={{ position: "fixed", bottom: "5em", right: "5em" }}>
          게시글 작성하기
        </div>
        


        {AddFormClass && (
          <WriteBoard
            board={{ ...defaultBoard }}
            FormTitle="새로운 게시글 작성"
            handleXButton={handleAddXButton}
            formClass={AddFormClass}
            BoardComplete={CreateBoard}
          />
        )}
      </div>
      </>
   )}
   else{
    return(<div >로그인해주세용</div>);
  }
  }

export default function BoardList(props: any): any {
  return <Logined />;
}
