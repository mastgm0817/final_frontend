import React, { useState, useEffect } from "react";

import Comment from "../app/comment";
import SendData from "../app/api/board/SendData";
import "./../public/css/board.css"

const defaultComment: Comment = {
  cid: 0,
  ccontent: " ",
  ccreatedAt:" ",
  nickName: " "
};
const CommentForm = (props:any) => {
  const [newComment, setNewComment] = useState<Comment>({ ...props.comment });
  return (
    <>
      <form>
        <div>
          <input
            id="outlined-basic"
            type="text"
            value={props.comment.ccontent === "" ? "" : newComment.ccontent}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNewComment({ ...newComment, ccontent: event.target.value });
            }}
          />
        </div>
      </form>
      <button
        onClick={() => {
          newComment.nickName = props.nickName;
          console.log(newComment.nickName);
          props.CommetComplete(newComment, props.selectedBoard.bid);
        }}
      >
        제출
      </button>
    </>
  );
}
// =======================================================================
function BoardDetail(props: any) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [AddCommentFormClass, setAddCommentFormClass] = useState<String | null | boolean>(false)
  const [UpdateCommentFormClass, setUpdateCommentFormClass] = useState<String | null | boolean>(false)
  const [newComment, setNewComment] = useState<Comment>({ ...defaultComment });
  const [selectedComment, setSelectedComment] = useState<Comment>({...defaultComment});
  
  newComment.nickName=props.nickName;
  const fetchData = async () => {
      try {
          const response = await SendData("GET", `/api/boards/${props.selectedBoard.bid}/comments`,null,"fetch comment");
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
      setAddCommentFormClass(false);
    } else if (AddCommentFormClass === false) {
      setNewComment(defaultComment);
      setAddCommentFormClass(true);
    } else {
      setAddCommentFormClass(true);
    }
  }
  function ToggleUpdateComment(){
    if (UpdateCommentFormClass === true) {
      setUpdateCommentFormClass(false);
    } else if (UpdateCommentFormClass === false) {
      setUpdateCommentFormClass(true);
      setNewComment(newComment);
    } else {
      setUpdateCommentFormClass(true);
    }
  }
  async function CreateComment(newComment:Comment, bid:Number){
    console.log(newComment);
    await SendData("POST", `/api/boards/${bid}/comments`,newComment,"create comment");
    ToggleAddComment();
    fetchData();
  }
  async function DeleteComment(cid:any, bid:any){
    await SendData("DELETE", `/api/boards/${bid}/comments/${cid}`,null,"delete comment");
    fetchData();
  }
  async function UpdateComment(updatedComment:Comment, bid:any){
    const cid=updatedComment.cid;
    await SendData("PUT",  `/api/boards/${bid}/comments/${cid}/update` , updatedComment, "update comment");
    ToggleUpdateComment();
    fetchData();
  }
  return (
    // =============================================board
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
                }}>수정</button>
              {/* 삭제 */}
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  props.DeleteBoard(props.selectedBoard);
                }}>삭제</button>
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
                props.HandleRecommendButton(props.selectedBoard.bid);
              }}
            >
              추천 {props.selectedBoard.b_recommendations}
            </button>
          </div>
          <div>
          </div>
          <br></br>



          {/* ===================================================comment */}
          {commentListShow &&
          <>

          <div>
            {comments &&
              comments.map((comment) => (
                <React.Fragment key={comment.cid}>
                  <div style={{padding:'10px'}}>
                    <div>
                      {comment.nickName}  {comment.ccreatedAt}
                    <button onClick={() => DeleteComment(comment.cid, props.selectedBoard.bid)}>삭제</button>
                    <button onClick={() => {(ToggleUpdateComment()); setSelectedComment(comment);}}>수정</button>
                    </div>
                    <div >
                      {comment.ccontent}
                    </div>
                  </div>
                  {/* 수정폼 */}
                    {UpdateCommentFormClass && comment.cid===selectedComment.cid &&
                      <CommentForm
                        selectedBoard={props.selectedBoard}
                        comment={{ ...comment }}
                        formClass={UpdateCommentFormClass}
                        CommetComplete={UpdateComment}
                      />}
                </React.Fragment>
              ))}
          </div>
          <hr></hr>

          {/* 댓글작성폼 */}
          {AddCommentFormClass && (
            <CommentForm
            selectedBoard={props.selectedBoard}
            comment={{ ...selectedComment }}
            formClass={AddCommentFormClass}
            nickName={props.userName}
            CommetComplete={CreateComment}
            />

          
        )}
          

          
        </div>
      </div>
    </div>
  );
}
export default BoardDetail;