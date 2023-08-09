import React, { useState, useEffect } from "react";

import Comment from "../types/comment";
import SendData from "../app/api/board/SendData";
import "./../public/css/board.css";
import { CommonExecOptions } from "child_process";

const defaultComment: Comment = {
  cid: 0,
  ccontent: " ",
  ccreatedAt: " ",
  nickName: " ",
};
const CommentForm = (props: any) => {
  const [newComment, setNewComment] = useState<Comment>({ ...props.comment });
  newComment.nickName = props.nickName;
  return (
    <>
      <form className="mb-4">
        <input
          type="text"
          value={props.comment.ccontent === "" ? "" : newComment.ccontent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNewComment({ ...newComment, ccontent: event.target.value });
          }}
          className="border rounded w-full py-2 px-3"
          placeholder="Enter comment..."
        />

        <button
          onClick={() => {
            newComment.nickName = props.nickName;
            console.log(newComment.nickName);
            props.CommetComplete(newComment, props.selectedBoard.bid);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          제출
        </button>
      </form>
    </>
  );
};
// =======================================================================
function BoardDetail(props: any) {
  const [comments, setComments] = useState<Comment[] | any>([]);
  const [AddCommentFormClass, setAddCommentFormClass] = useState<
    String | null | boolean
  >(false);
  const [UpdateCommentFormClass, setUpdateCommentFormClass] = useState<
    String | null | boolean
  >(false);
  const [newComment, setNewComment] = useState<Comment>({ ...defaultComment });
  const [selectedComment, setSelectedComment] = useState<Comment>({
    ...defaultComment,
  });
  const [commentListShow, setCommentListShow] = useState<boolean>(false);
  newComment.nickName = props.userName;

  const fetchData = async () => {
    try {
      const response = await SendData(
        "GET",
        `/api/boards/${props.selectedBoard.bid}/comments`,
        null,
        "fetch comment"
      );
      setComments(response);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  function ToggleAddComment() {
    if (AddCommentFormClass === true) {
      setAddCommentFormClass(false);
    } else if (AddCommentFormClass === false) {
      setNewComment(defaultComment);
      setAddCommentFormClass(true);
    } else {
      setAddCommentFormClass(true);
    }
  }
  function ToggleUpdateComment() {
    if (UpdateCommentFormClass === true) {
      setUpdateCommentFormClass(false);
    } else if (UpdateCommentFormClass === false) {
      setUpdateCommentFormClass(true);
      setNewComment(newComment);
    } else {
      setUpdateCommentFormClass(true);
    }
  }
  async function CreateComment(newComment: Comment, bid: Number) {
    console.log(newComment);
    await SendData(
      "POST",
      `/api/boards/${bid}/comments`,
      newComment,
      "create comment"
    );
    ToggleAddComment();
    fetchData();
  }
  async function DeleteComment(cid: any, bid: any) {
    await SendData(
      "DELETE",
      `/api/boards/${bid}/comments/${cid}`,
      null,
      "delete comment"
    );
    fetchData();
  }
  async function UpdateComment(updatedComment: Comment, bid: any) {
    const cid = updatedComment.cid;
    await SendData(
      "PUT",
      `/api/boards/${bid}/comments/${cid}/update`,
      updatedComment,
      "update comment"
    );
    ToggleUpdateComment();
    fetchData();
  }
  return (
    // =============================================board
    <div className={"Board-to-show bg-white p-4 shadow-lg rounded-md"}>
      <div className="ml-8">
        <div className="p-4">
          <div>
            <h2 className="text-xl font-bold mb-4">
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
            <div className="detail-additional">
              조회수&nbsp; {props.selectedBoard.b_views}
            </div>
          </div>
          <br></br>
          <div>
            <div>
              <button
                onClick={() => {
                  props.ToggleUpdateForm(props.selectedBoard);
                }}
              >
                수정
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  props.DeleteBoard(props.selectedBoard);
                }}
              >
                삭제
              </button>
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
            <button onClick={() => setCommentListShow(!commentListShow)}>
              댓글 {comments.length}
            </button>
          </div>

          <br></br>

          {/* ===================================================comment */}

          {commentListShow && (
            <>
              <div>
                <p>
                  <b>댓글 목록</b>
                </p>{" "}
                <button onClick={ToggleAddComment}>댓글작성</button>
              </div>

              <div>
                {comments &&
                  comments.map((comment: Comment) => (
                    <React.Fragment key={comment.cid}>
                      <div>
                        <div>
                          {comment.nickName} {comment.ccreatedAt}
                        </div>
                        <div>{comment.ccontent}</div>
                        <button
                          onClick={() =>
                            DeleteComment(comment.cid, props.selectedBoard.bid)
                          }
                        >
                          삭제
                        </button>
                        <button
                          onClick={() => {
                            ToggleUpdateComment();
                            setSelectedComment(comment);
                          }}
                        >
                          수정
                        </button>
                      </div>

                      {/* 수정폼 */}
                      {UpdateCommentFormClass &&
                        comment.cid === selectedComment.cid && (
                          <CommentForm
                            selectedBoard={props.selectedBoard}
                            comment={{ ...comment }}
                            formClass={UpdateCommentFormClass}
                            CommetComplete={UpdateComment}
                          />
                        )}
                    </React.Fragment>
                  ))}
              </div>
              <hr></hr>

              <br></br>
              <br></br>
              <hr></hr>
              {/* 댓글작성폼 */}
              {AddCommentFormClass && (
                <CommentForm
                  selectedBoard={props.selectedBoard}
                  comment={{ ...selectedComment }}
                  formClass={AddCommentFormClass}
                  userName={props.userName}
                  CommetComplete={CreateComment}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BoardDetail;
