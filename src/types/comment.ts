import { Key } from "react";
import { ISODateString } from "next-auth";

type Comment = {
    cid : Key,
    nickName : String,
    c_content : String,
    c_createdAt : ISODateString,
    bid : Number
  }

export default Comment;