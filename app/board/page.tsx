"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Board from "../../types/board";
import FetchBoards from "../api/board/fetchPost";
import WriteBoard from "../../components/WriteBoard";
import SendData from "../api/board/SendData";
import BoardDetail from "../../components/BoardDetail";
// import 'semantic-ui-css/semantic.min.css';




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
  const [boards, setBoards] = useState<Board[]>([]); //board목록
  const [AddFormClass, setAddFormClass] = useState<String | null>(null); //글추가폼의 class
  const [UpdateFormClass, setUpdateFormClass] = useState<String | null>(null);
  const [newBoard, CreateNewBoard] = useState<Board>({ ...defaultBoard }); //새로운 board
  const [selectedBoard, setSelectedBoard] = useState<Board>(defaultBoard); //선택된 board
  const [showMyBoard, setShowMyBoard] = useState<Boolean>(false);

  const fetchData = async () => {
    try {
      const response = await FetchBoards();
      setBoards(response);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  async function HandleBoardClick(event: any, clickedBoard: Board) {
    //게시글 클릭 시 게시글은 clicked
    if (selectedBoard === null || selectedBoard.bid !== clickedBoard.bid) {
      setSelectedBoard(clickedBoard); //게시글을 활성화상태로
      await SendData("GET", `/api/boards/${clickedBoard.bid}`,null,"view");
      fetchData();
      console.log(clickedBoard.bid + "번 게시글 조회됨");
    } else if (
      selectedBoard !== null &&
      selectedBoard.bid === clickedBoard.bid
    ) {
      setSelectedBoard(defaultBoard);
    }
  }
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
  async function ToggleUpdateForm(board: Board) {
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
  function handleAddXButton() {
    setAddFormClass("formOff");
  }
  function handelUpdateXButton() {
    setSelectedBoard(defaultBoard);
    setUpdateFormClass("formOff");
  }
  async function CreateBoard(newBoard: Board) {
    newBoard.nickName = `${session ? session.user?.name : null}`;
    await SendData("POST", `/api/boards`,newBoard,"create");
    ToggleAddForm();
    fetchData();
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
  async function HandleRecommendButton() {
    await SendData("PUT", `/api/boards/${selectedBoard.bid}/recommend`,null,"recommend");
    fetchData();
  }
  async function SubmitComment(board: Board, commentText: string) {}
  function FilterBoard(){
  //     setShowMyBoard(!showMyBoard);
  //     if (showMyBoard){
  //         const reqName = session?session.user.name:" ";
  //         HandleFilterBoard(reqName);
  //         fetchData();
  //     }else {
    // 내글보기 - 1. 사용자 닉네임을 서버로 보냄 2.서버에서는 사용자 닉네임으로 게시글 목록 만들어 전송 3. boards를 받은 게시물 목록으로 설정
    // 전체글보기 - 전체글가져오기, boards를 전체글로 설정
      }


  if (session) {
    const userName = session.user?.name;
    return session ? (
      
      <div className="ui container">
          <h1 style={{ textAlign: "center" }}>게시판</h1>
          <br></br>
          <p>내글보기</p>

        <div className="ui grid"
          style={{position: "absolute", left: "0%", transform: "translate(20%)", }}>
          <div className="ui ten column grid">
              <div className="three wide column"><b>No</b></div>
              <div className="two wide column"><b>제목</b></div>
              <div className="four wide column"><b>작성일자</b></div>
              <div className="two wide column"><b>작성자</b></div>
              <div className="two wide column"><b>추천수</b></div>
              <div className="two wide column"><b>조회수</b></div>
            <br></br>

            {boards &&
              boards.map((board) => (
                <React.Fragment key={board.bid} >
                  <div className="ui fluid segment" onClick={(event) => HandleBoardClick(event, board)}>
                    <div className="ui ten column grid">
                      <div className="three wide column">{board.bid}</div>
                      <div className="two wide column">{board.b_title}</div>
                      <div className="four wide column">{board.b_createdAt.toLocaleString()}</div>
                      <div className="two wide column">{board.nickName}</div>
                      <div className="two wide column">{board.b_recommendations.toLocaleString()}</div>
                      <div className="two wide column">{board.b_views.toLocaleString()}</div>
                    </div>
                  </div>

                  <br></br>
                  <div className={selectedBoard && selectedBoard.bid === board.bid ? "active" : ""}>
                    <BoardDetail
                      userName={userName}
                      selectedBoard={board}
                      ToggleUpdateForm={() => ToggleUpdateForm(board)}
                      DeleteBoard={DeleteBoard}
                      HandleRecommendButton={HandleRecommendButton}

                    />
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>

        <div className="ui right floated button"
          onClick={ToggleAddForm}
          style={{ position: "fixed", bottom: "5em", right: "5em" }}
        >
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
    ) : (
      <div>로그인해주세용</div>
    );
  }
}

export default function BoardList(props: any): any {
  return <Logined />;
}
