import { useState, useEffect } from "react";
import { Grid, TextField, FormControl, Button } from "@mui/material";
import "/public/css/board.css";
import React from "react";
import Board from "../app/board";

export default function WriteBoard(props: any) {
  const [newBoard, setNewBoard] = useState<Board>(props.board);

  useEffect(() => {
    setNewBoard(props.board);
  }, [props.board]);

  return (
    <Grid container spacing={50}>
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
            <TextField
              id="outlined-basic"
              label="제목"
              variant="standard"
              type="text"
              value={props.board.b_title === "" ? "" : newBoard.b_title}
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
            <FormControl fullWidth variant="standard">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "left",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="내용"
                  variant="standard"
                  type="text"
                  value={props.board.b_content === "" ? "" : newBoard.b_content}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setNewBoard({ ...newBoard, b_content: event.target.value })
                  }
                />
              </div>
            </FormControl>
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
          <Button onClick={() => props.BoardComplete(newBoard)}>
            게시글 작성 완료
          </Button>
        </div>
      </div>
    </Grid>
  );
}
