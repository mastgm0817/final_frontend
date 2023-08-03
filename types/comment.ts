import { Key } from "react";
import { ISODateString } from "next-auth";

type Comment ={
  cid:Key;
  ccontent:string;
  ccreatedAt:ISODateString;
  uid:String;
  nickName:String;
}

export default Comment;