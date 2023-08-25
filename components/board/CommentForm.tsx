import { useState } from "react";
import Comment from "../../types/comment";
import { useSession } from "next-auth/react";

const defaultComment: Comment = {
    cid: 0,
    ccontent: " ",
    ccreatedAt: " ",
    nickName: " ",
  };
  
  const CommentForm = (props:any) => {
    const commentMethod=props.method;
    const { data: session } = useSession();
    const [newComment, setNewComment] = useState<Comment>({ ...props.comment });
    newComment.nickName=props.nickName;
    // console.log("댓글작성자:"+newComment.nickName);
    return (
      <div className="flex flex-col mt-4 space-y-4 w-11/12">
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
            newComment.nickName = session?.user.name;
            props.CommetComplete(newComment, props.selectedBoard.bid);
          }}
            className="bg-pink-500 text-white p-2 rounded hover:bg-black transition"
        >
          제출
          </button>
          <button
            onClick={() => {props.ToggleCommentForm();} }
            className="bg-gray-200 text-gray-500 p-2 rounded hover:bg-gray-300 transition"
          >
            취소
          </button>
        </div>
      </div>
    );
  };

  export default CommentForm;