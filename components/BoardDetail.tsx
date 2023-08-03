import React, { useState, useEffect } from "react";

import { TextField} from "@mui/material";

import Comment from "../app/comment";
import Board from "../app/board";
import SendData from "../app/api/board/SendData";
import FetchComments from "../app/api/board/FetchComments";
import "./../../public/css/board.css"


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

const defaultComment: Comment = {
  cid: 0,
  cContent: " ",
  cCreatedAt:" ",
  nickName: " "
};

const CommentForm = (props:any) => {

  const [newComment, setNewComment] = useState<Comment>({ ...defaultComment });
  
  return(
    <>
    <form>
      <div className={props.formClass}>
        <TextField
              id="outlined-basic"
              label="댓글"
              variant="standard"
              type="text"
              value={props.comment.cContent === "" ? "" : newComment.cContent}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                {setNewComment({ ...newComment, cContent: event.target.value })}
                }
        />
      </div>
    </form>
      <button onClick={() => {newComment.nickName=props.nickName;
        props.CommetComplete(newComment, props.selectedBoard.bid);}}>
      제출
          </button>
            
    
    </>
  );
}


function BoardDetail(props: any) {

  const [comments, setComments] = useState<Comment[]>([]);
  const [AddCommentFormClass, setAddCommentFormCClass] = useState<String | null | boolean>(false)
  const [newComment, setNewComment] = useState<Comment>({ ...defaultComment });
  newComment.nickName=props.nickName;
  async function CreateComment(newComment:Comment, bid:Number){
    console.log(newComment);
    await SendData("POST", `/api/boards/${bid}/comments`,newComment,"create comment");
    fetchData();
  }
  const fetchData = async () => {
      try {
          const response = await FetchComments(props.selectedBoard.bid);
          setComments(response);
      } catch (error) {
          console.error('Error fetching boards:', error);
      }
  };

  useEffect(() => {
      fetchData();
  }, []);

  function ToggleAddComment(){
    if (AddCommentFormClass === true) {
      setAddCommentFormCClass(false);
    } else if (AddCommentFormClass === false) {
      setAddCommentFormCClass(true);
      setNewComment(newComment);
    } else {
      setAddCommentFormCClass(true);
    }

  }


  return (
    <div className={"Board-to-show"}>
      <div style={{ marginLeft: "30" }}>
        <div style={{ padding: "5px" }}>
          <div>
            <h2>
              <b>{props.selectedBoard.b_title}</b>
            </h2>
          </div>
          <br></br>

          <div>
            <div className="detail-additional">
              {props.selectedBoard.nickName}
            </div>
          </div>

          <div>
            <div className="detail-additional">
              작성일&nbsp; {props.selectedBoard.b_createdAt}
            </div>
            <div className="detail-additional">
              최근 수정&nbsp; {props.selectedBoard.b_updatedAt}
            </div>
          </div>
          <div>
            <div className="detail-additional">
              조회수&nbsp; {props.selectedBoard.b_views}
            </div>
          </div>
          <br></br>
          <div>
            <div>
              {/* 수정 */}
              <button
                onClick={() => {
                  props.ToggleUpdateForm(props.selectedBoard);
                }}
              />
              {/* 삭제 */}
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  props.DeleteBoard(props.selectedBoard);
                }}
              />
              <br></br>
            </div>
          </div>
          <br></br>

          {/* 내용 */}
          <div>
            <p style={{ marginBottom: "1em" }}>
              {props.selectedBoard.b_content}
            </p>
          </div>
          <br></br>

          {/* 추천 */}
          <div>
            <button
              onClick={(event) => {
                event.stopPropagation();
                props.HandleRecommendbutton(props.selectedBoard.bid);
              }}
            >
              추천 {props.selectedBoard.b_recommendations}
            </button>
          </div>
          <div>

          </div>
          <br></br>
          <div>
            <h4>댓글 목록</h4>
          </div>

          <div>
            {comments &&
              comments.map((comment) => (
                <React.Fragment key={comment.cid}>
                  <div style={{ textAlign: "center" }}>
                    <div >
                      {comment.cid}
                    </div>
                    <div >
                      {comment.nickName}
                    </div>
                    <div >
                      {comment.cContent}
                    </div>
                  </div>
                </React.Fragment>
              ))}
          </div>
          <hr></hr>

          <button onClick={ToggleAddComment}>댓글작성</button>

          {AddCommentFormClass && (
            <CommentForm
              selectedBoard={props.selectedBoard}
              comment={{ ...defaultComment }}
              formClass={AddCommentFormClass}
              CommetComplete={CreateComment}
            />
        )}
          

          
        </div>
      </div>
    </div>
  );
}

export default BoardDetail;
