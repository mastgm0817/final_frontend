import { ISODateString } from "next-auth";
import { Key } from "react";

type Board = {
    bid : Key,
    nickName : String,
    b_title : String,
    b_content : String,
    b_createdAt : ISODateString,
    b_updatedAt : ISODateString,
    b_views : Number,
    comments : Number,
    b_recommendations : Number,
  }

export default Board;