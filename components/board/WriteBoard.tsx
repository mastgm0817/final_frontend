import React, { useState, useEffect } from "react";
import "./../../public/css/board.css";
import Board from "../../types/board";
import Head from "next/head";

interface WriteBoardProps {
  board: Board;
  formClass: string;
  FormTitle: string;
  handleXButton: () => void;
  BoardComplete: (board: Board) => void;
}

export default function WriteBoard(props: WriteBoardProps) {
  const [newBoard, setNewBoard] = useState<Board>({ ...props.board });

  useEffect(() => {
    setNewBoard({ ...props.board });
  }, [props.board]);

  const submitForm = () => {
    if (!newBoard.btitle) {
      alert("제목을 써 주세요!");
      return;
    } else if (newBoard.btitle.length > 10) {
      alert("제목은 15자를 넘을 수 없습니다.");
      return;
    } else if (!newBoard.bcontent) {
      alert("내용을 써 주세요!");
      return;
    } else {
      const isConfirmed = window.confirm("게시글을 등록할까요?");
      if (!isConfirmed) {
        return;
      }
    }
    props.BoardComplete(newBoard);
  };

  return (
    <>
      <Head>
        <title>러부스트 Luvoost - 완벽한 데이트 코스 찾기</title>
        <meta
          name="description"
          content="러부스트 Luvoost에서 사랑하는 연인과 완벽한 데이트를 계획해보세요."
        />
        <meta
          name="keywords"
          content="데이트, 연인, 커플, 로맨틱, 러부스트, Luvoost"
        />
        <meta
          property="og:title"
          content="러부스트 Luvoost - 사랑하는 연인과의 완벽한 데이트 코스"
        />
        <meta
          property="og:description"
          content="참신하고 아름다운 데이트 아이디어를 러부스트 Luvoost에서 찾아보세요. 여기서 당신의 이상적인 데이트를 계획해보세요."
        />
        <meta property="og:image" content="URL_OF_YOUR_IMAGE_HERE" />
      </Head>

      <div className="justify-center items-center z-5000">
        <div className={props.formClass}>
          <div className={"bg-white p-6 shadow-lg rounded-md border"}>
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-bold ml-3 mt-4 ">
                {props.FormTitle}
              </div>
              <div
                className="cursor-pointer text-red-500"
                onClick={props.handleXButton}
              >
                X
              </div>
            </div>
            <form>
              <div className="mb-4 mr-4 ml-3 py-2 w-full">
                <input
                  placeholder="제목"
                  type="text"
                  value={newBoard.btitle}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setNewBoard({ ...newBoard, btitle: event.target.value })
                  }
                  className="w-full px-5 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="mb-4 mr-4 ml-3 py-2 w-full">
                <textarea
                  placeholder="내용"
                  rows={4}
                  value={newBoard.bcontent}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setNewBoard({ ...newBoard, bcontent: event.target.value })
                  }
                  className="w-full px-5 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                ></textarea>
              </div>
            </form>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => submitForm()}
                className="bg-pink-500 hover:bg-black text-white px-4 py-2 rounded focus:outline-none"
              >
                게시글 작성 완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
