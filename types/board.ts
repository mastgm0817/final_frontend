import { ISODateString } from "next-auth";
import { Key } from "react";

type Board = {
  bid: Key;
  nickName: string;
  b_title: string;
  b_content: string;
  b_createdAt: ISODateString;
  b_updatedAt: ISODateString;
  b_views: number;
  comments: number;
  b_recommendations: number;
};

export default Board;
