
import { ISODateString } from "next-auth";
import Comment from "./comment";

type CommentRequest = {
  comment:Comment;
  uid:any;
};

export default CommentRequest;