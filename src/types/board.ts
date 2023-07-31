import { Key } from "react";

type Board = {
    bid : Key,
    nickName : String,
    b_title : String,
    b_content : String,
    b_createdAt : ,
    b_updatedAt : String,
    b_views : Number,
    comments : Number,
    b_recommendations : Number,
  }

export default Board;

// const board1:Board = {
//     bid : 1,
//     nickName : "lin",
//     b_title : "Hello",
//     b_content : "World",
//     b_createdAt : new Date(),
//     b_updatedAt : new Date(),
//     b_views : 10,
//     comments : 0,
//     b_recommendations : 0,
// };