import { Key } from "react";
import { ISODateString } from "next-auth";

type Comment ={
  id: Number,
  content: String,
  createdAt: String,
  author: String
}

export default Comment;