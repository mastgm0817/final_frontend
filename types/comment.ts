import { Key } from "react";
import { ISODateString } from "next-auth";

type Comment = {
  cid: Key;
  ccontent: string;
  ccreatedAt: ISODateString;
  nickName: String;
};

export default Comment;
