import React, { useState, useEffect, useCallback } from "react";

import Comment from "../types/comment";
import SendData from "../app/api/board/SendData";
import MenuButton from "./MenuButton";
import "./../public/css/board.css";
import { CommonExecOptions } from "child_process";
import { useSession } from "next-auth/react";

const defaultComment: Comment = {
  cid: 0,
  ccontent: " ",
  ccreatedAt: " ",
  nickName: " ",
};

// const comment1: Comment = {
//   cid: 1,
//   ccontent: "dh",
//   ccreatedAt:"askweuhnfoaeddfwoieujf",
//   nickName: "뀰"
// };
// const comment2: Comment = {
//   cid: 2,
//   ccontent: "우히~",
//   ccreatedAt:"askweuhnfoaeddfwoieujf",
//   nickName: "이규린"
// };

//=================================================================================
const CommentForm = (props:any) => {
  const [newComment, setNewComment] = useState<Comment>({ ...props.comment });
  newComment.nickName=props.nickName;
  return (
    <div className="flex flex-col mt-4 space-y-4">
      <form className="flex flex-col space-y-2">
        <label className="text-sm font-bold text-gray-600" htmlFor="comment-content">CONTENT</label>
        <input
          id="comment-content"
          type="text"
          placeholder="댓글을 작성해주세요."
          value={props.comment.ccontent === "" ? "" : newComment.ccontent}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setNewComment({ ...newComment, ccontent: event.target.value })
          }
          className="border rounded p-2 focus:outline-none focus:border-pink-500 transition"
        />
      </form>
      
      <div className="flex space-x-2">
      <button
        onClick={() => {
          newComment.nickName = props.nickName;
          props.CommetComplete(newComment, props.selectedBoard.bid);
        }}
          className="bg-pink-500 text-white p-2 rounded hover:bg-black transition"
      >
        제출
        </button>
        <button 
          onClick={props.ToggleAddComment} 
          className="bg-gray-200 text-gray-500 p-2 rounded hover:bg-gray-300 transition"
        >
          취소
        </button>
      </div>
    </div>
  );
};


// =======================================================================
function BoardDetail(props: any) {
  
  const [comments, setComments] = useState<Comment[] | any>([]);
  const [AddCommentFormClass, setAddCommentFormClass] = useState<String | null | boolean>(false)
  const [UpdateCommentFormClass, setUpdateCommentFormClass] = useState<String | null | boolean>(false)
  const [newComment, setNewComment] = useState<Comment>({ ...defaultComment });
  const [selectedComment, setSelectedComment] = useState<Comment>({...defaultComment});
  const [commentListShow, setCommentListShow]=useState<boolean>(props.commentListShow)
  const { data: session } = useSession();
  
  newComment.nickName=props.userName;
  // const comments=[comment1, comment2];

  const fetchData = useCallback(async () => {
    try {
        const response = await SendData("GET", `/boards/${props.selectedBoard.bid}/comments`, null, "fetch comment");
        setComments(response);
    } catch (error) {
        console.error('Error fetching boards:', error);
    }
  }, [props.selectedBoard.bid]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
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

  async function CreateComment(newComment:Comment, bid:Number){

    console.log(newComment);
    await SendData(
      "POST",
      `/boards/${bid}/comments`,
      newComment,
      "create comment"
    );
    ToggleAddComment();
    fetchData();
  }
  async function DeleteComment(cid: any, bid: any) {
    await SendData(
      "DELETE",
      `/boards/${bid}/comments/${cid}`,
      null,
      "delete comment"
    );
    fetchData();
  }
  async function UpdateComment(updatedComment: Comment, bid: any) {
    const cid = updatedComment.cid;
    await SendData(
      "PUT",
      `/boards/${bid}/comments/${cid}/update`,
      updatedComment,
      "update comment"
    );
    ToggleUpdateComment();
    fetchData();
  }
  function addLineBreaks(str:string, length = 78) {
    let newStr = '';
    while (str.length > 0) {
      newStr += str.substring(0, length) + '\n';
      str = str.substring(length);
    }
    return newStr;
  }
  const lineBrakedContent=addLineBreaks(props.selectedBoard.b_content);
  const name=session?.user?.name
  return (
    <div className="w-11/12 space-y-1">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-2xl">{props.selectedBoard.b_title}</h1>
          
          {props.selectedBoard.nickName===session?.user?.name &&
            <MenuButton className="text-gray-600"
              ToggleUpdateForm={props.ToggleUpdateForm}
              selectedBoard={props.selectedBoard}
              DeleteBoard={props.DeleteBoard} />}
        </div>
        
        <div className="text-xs text-gray-400 mb-2">{props.selectedBoard.nickName}</div>
        <div className="text-xs text-gray-400">작성일 {props.selectedBoard.b_createdAt}</div>
        <div className="text-xs text-gray-400">최근 수정 {props.selectedBoard.b_updatedAt}</div>
        <div className="text-xs text-gray-400">조회수 {props.selectedBoard.b_views}</div>
        <div className="flex space-x-4 mt-4 divide-solid"></div><br />
        
        <p className="text-gray-700 text-base whitespace-pre-line">{lineBrakedContent}</p>
        <br /><br />
        <div className="flex space-x-4">
          {/* 추천 */}
          <button
            onClick={(event) => {
              event.stopPropagation();
              props.HandleRecommendButton(props.selectedBoard.bid);
            }}
            className="flex items-center space-x-2 text-xs font-medium text-pink-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
            </svg><span>{props.selectedBoard.b_recommendations}</span>
          </button>
          {/* 댓글 */}
          <button onClick={() => setCommentListShow(!commentListShow)} className="flex items-center space-x-2 text-xs font-medium text-pink-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg><span>{comments.length}</span>
          </button>
        </div>
        {/* ===================================================comment */}

        {commentListShow && 
          <div className={`comment-list ${commentListShow ? 'p-4 rounded-lg shadow-md' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-bold">댓글</p> 
                  <button 
                      onClick={ToggleAddComment}
                      className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-black transition">
                      댓글작성
                  </button>
              </div>

              <div className="space-y-4">
                  {comments &&
                  comments.map((comment:Comment) => (
                      <React.Fragment key={comment.cid}>
                      <div className="border p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div className="flex">
                              <span className="font-semibold">{comment.nickName} &nbsp;&nbsp;</span>
                              <span className="text-sm text-gray-500">{comment.ccreatedAt}</span>
                          </div>
                          {session && session.user && session?.user.name===comment.nickName &&
                            <div className="flex space-x-2">
                              <button 
                                  onClick={() => DeleteComment(comment.cid, props.selectedBoard.bid)}
                                  className="text-xs text-black px-2 py-1 rounded hover:bg-red-100 transition">
                                  삭제
                              </button>
                              <button 
                                  onClick={() => {ToggleUpdateComment(); setSelectedComment(comment);}}
                                  className="text-xs text-blue px-2 py-1 rounded hover:bg-blue-100 transition">
                                  수정
                              </button>
                          </div>}
                        </div>

                          <p className="mt-2">{comment.ccontent}</p>
                          
                          {/* 수정폼 */}
                          {UpdateCommentFormClass && comment.cid===selectedComment.cid &&
                              <CommentForm
                              selectedBoard={props.selectedBoard}
                              comment={{ ...comment }}
                              formClass={UpdateCommentFormClass}
                              CommetComplete={UpdateComment} />}
                      </div>
                      </React.Fragment>
                  ))}
              </div>
              <hr className="my-4"></hr>

              {/* 댓글작성폼 */}
              {AddCommentFormClass && (
              <CommentForm
                  ToggleAddComment={ToggleAddComment}
                  selectedBoard={props.selectedBoard}
                  comment={{ ...selectedComment }}
                  formClass={AddCommentFormClass}
                  userName={props.userName}
                  CommetComplete={CreateComment}
              />)}
          </div>
      }
      
      </div>);}

export default BoardDetail;
