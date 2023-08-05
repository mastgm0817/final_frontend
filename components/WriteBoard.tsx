import React, { useState, useEffect } from "react";
import "./../public/css/board.css";
import Board from "../types/board";

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

  return (
    <div>
      <div id="board-form" className={props.formClass}>
        <h2 style={{ textAlign: "center" }}>{props.FormTitle}</h2>
        <div className="close-icon" onClick={props.handleXButton}>
          X
        </div>

        <form>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "left",
            }}
          >
            <input
              placeholder="제목"
              type="text"
              value={newBoard.b_title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setNewBoard({ ...newBoard, b_title: event.target.value })
              }
            />
          </div>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "left",
              }}
            >
              <input
                placeholder="내용"
                type="text"
                value={newBoard.b_content}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNewBoard({ ...newBoard, b_content: event.target.value })
                }
              />
            </div>
          </div>
        </form>

        <br></br>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={() => props.BoardComplete(newBoard)}>
            게시글 작성 완료
          </button>
        </div>
      </div>
    </div>
  );
}
