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
    return session ? (
      
      <div>
          <h1 style={{ textAlign: "center" }} onClick={() => setPages(0)}>게시판</h1>
          <br></br>
          <button>내글보기</button>

        <div>
          <div>
              <p><b>No 제목 작성일자 작성자 추천수 조회수</b></p>
            <br></br>
          </div>
          <Page params={{ pagenum: pages }} />
        </div>

        <button onClick={() => setPages(pages-1)}>이전페이지</button>
        {pages>=1 && <button onClick={() => setPages(pages-1)}>{pages-1}</button>}
        {pages>1 && <button onClick={() => setPages(pages-2)}>{pages-2}</button>}
        <p>{pages}</p>
        <button onClick={() => setPages(pages+1)}>다음페이지</button>
        <button onClick={() => setPages(pages+1)}>{pages+1}</button>
        <button onClick={() => setPages(pages+2)}>{pages+2}</button>

        <div className="ui right floated button"
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
    ) : (
      <div>로그인해주세용</div>
    );
  }
}
export default function BoardList(props: any): any {
  return <Logined />;
}
