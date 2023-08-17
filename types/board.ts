import { ISODateString } from "next-auth";
import { Key } from "react";

type Board = {
  bid: Key;
  nickName: string;
  btitle: string;
  bcontent: string;
  b_createdAt: ISODateString;
  b_updatedAt: ISODateString;
  b_views: Number;
  comments: Number;
  b_recommendations: Number;
};

export default Board;
