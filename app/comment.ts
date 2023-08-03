import { Key } from "react";
import { ISODateString } from "next-auth";

type Comment ={
  cid:Key;
  cContent:string;
  cCreatedAt:ISODateString;
  uid:String;
  nickName:String;
}

export default Comment;