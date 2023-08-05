import { ISODateString } from "next-auth";
import { Key } from "react";

type Board = {
  bid: Key;
  nickName: string;
  b_title: string;
  b_content: string;
  b_createdAt: ISODateString;
  b_updatedAt: ISODateString;
  b_views: Number;
  comments: Number;
  b_recommendations: Number;
};

export default Board;
