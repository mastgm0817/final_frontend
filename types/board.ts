import { ISODateString } from "next-auth";
import { Key } from "react";
import Comment from "./comment";

type Board = {
  bid: Key;
  nickName: string;
  btitle: string;
  bcontent: string;
  bcreatedAt: ISODateString;
  bupdatedAt: ISODateString;
  bviews: Number;
  comments: Number;
  brecommendations: Number;
  commentList:Comment[];
};

export default Board;
