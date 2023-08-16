"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Board from "../../types/board";
import WriteBoard from "../../components/WriteBoard";
import SendData from "../api/board/SendData";
import Page from "./[pagenum]/pagenum";
import SearchMethod from "./selectbox";

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
  const [showAddForm, setShowAddForm] = useState<boolean>(false); //글추가폼 켜고끄기
  const [showSearchForm, setSearchForm] = useState<boolean>(false); //검색창 켜고끄기
  const [searchMethod, setSearchMethod] = useState<String>("all")

  const [newBoard, CreateNewBoard] = useState<Board>({ ...defaultBoard }); //새로운 board
  const [pages, setPages] = useState<number>(0)

  const fetchData = useCallback(async () => {
    try {
        const response = await SendData("GET", `/boards/page/0`, null, "fetch boards");
        setBoards(response);
    } catch (error) {
        console.error("Error fetching boards:", error);
    }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


  function ToggleAddForm(): any {
    if (AddFormClass === "formOn") {
      setAddFormClass("formOff");
      setTimeout(()=>{setShowAddForm(false)}, 290);

    } else if (AddFormClass === "formOff") {
      setShowAddForm(true);
      setAddFormClass("formOn");
      CreateNewBoard(newBoard);
    } else {
      setShowAddForm(true);
      setAddFormClass("formOn");
    }
  }

  function handleAddXButton() {
    setAddFormClass("formOff");
    setTimeout(()=>{setShowAddForm(false)}, 283);
  }
  function handleSearchForm(){
    setSearchForm(!showSearchForm)
  }

  async function CreateBoard(newBoard: Board) {
    newBoard.nickName = `${session ? session.user?.name : null}`;
    await SendData("POST", `/boards`,newBoard,"create");
    ToggleAddForm();
    fetchData();
  }


  if (session) {
    const userName = session.user?.name;
    return (
      <>

      <div className="font-sans items-center max-w-6xl mx-auto flex-col justify-center min-h-screen bg-gray-100">
      <br /><br />
        <div className="flex justify-center items-center">
          <h1 className="text-3xl font-bold mb-4 items-center" onClick={() => setPages(0)}>게시판</h1></div>

          <br></br>
          <button className="text-blue-700">내글보기</button>
          <button onClick={handleSearchForm}>검색</button>
          {showSearchForm &&
            <div>
              <SearchMethod setSearchMethod={setSearchMethod}></SearchMethod>
              <input></input>
              <button>검색하기</button>
            </div>}
        <div>
          <div className="max-w-4xl bg-white rounded-lg p-4 mx-auto">
            <div className="flex justify-between items-center font-bold mb-4 border-b-2 pb-2">
              <div className="divide-y divide-gray-100"></div>
              <div className="w-1/12 text-center">No</div>
              <div className="w-4/12 text-center">제목</div>
              <div className="w-2/12 text-center">작성일자</div>
              <div className="w-2/12 text-center">작성자</div>
              <div className="w-1/12 text-center">추천수</div>
              <div className="w-1/12 text-center">조회수</div>
            </div>
            {AddFormClass && showAddForm && (
              <WriteBoard
                board={{ ...defaultBoard }}
                FormTitle="새로운 게시글 작성"
                handleXButton={handleAddXButton}
                formClass={AddFormClass}
                BoardComplete={CreateBoard}
                
              />
            )}
            <Page params={{ pagenum: pages }} />
          </div>
        </div>


        <div className="flex mt-4 space-x-2 justify-center items-center z-0">

          {pages>1 && <button onClick={() => setPages(0)}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">{"<<"}</button>}
          {pages>1 && <button onClick={() => setPages(pages-2)}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">{pages-1}</button>}
          {pages>=1 && <button onClick={() => setPages(pages-1)}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">{pages}</button>}
          <p className="bg-pink-500 text-white p-2 rounded relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium">{pages+1}</p>
          <button onClick={() => setPages(pages+1)}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">{pages+2}</button>
          <button onClick={() => setPages(pages+2)}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">{pages+3}</button>
        </div>

        <div className="fixed bottom-5 right-5 bg-pink-500 hover:bg-black text-white font-bold py-2 px-4 rounded-full"
          onClick={ToggleAddForm}
          style={{ position: "fixed", bottom: "5em", right: "5em" }}>
          게시글 작성하기
        </div>

        
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
