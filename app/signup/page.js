"use client";
import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const API_URL = process.env.NEXT_PUBLIC_URL;
  const [emailDuplicate, setEmailDuplicate] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState(""); // 비밀번호 상태 변수
  const [passwordConfirm, setPasswordConfirm] = React.useState(""); // 비밀번호 확인 상태 변수
  const [nickNameState, setNickNameState] = React.useState("");
  const [userNameState, setUserNameState] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [isNickNameUnique, setIsNickNameUnique] = useState(true);

  const handleEmailCheck = async (email) => {
    if (!email || email.trim() === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post(API_URL + `/normal/users/checkEmail`, {
        email: email,
      });
      if (response.data === true) {
        alert("이미 사용중인 이메일입니다.");
        setEmailDuplicate(true);
      } else {
        alert("사용 가능한 이메일입니다.");
        setEmailDuplicate(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkNickName = async () => {
    if (!nickNameState || nickNameState.trim() === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    try {
      const response = await axios.get(
        `${API_URL}/users/check/nickname?nickName=${nickNameState}`
      );
      if (response.data.exists) {
        setIsNickNameUnique(false);
        alert("닉네임이 이미 존재합니다. 다른 닉네임을 사용해주세요!");
      } else {
        setIsNickNameUnique(true);
        alert("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 실패", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const nickName = data.get("nickName");
    const userName = data.get("userName");

    // 입력 필드가 비어 있는지 확인
    if (!email || !password || !nickName || !userName || !passwordConfirm) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(API_URL + `/normal/users/join`, {
        nickName: nickName,
        userName: userName,
        email: email,
        password: password,
      });

      if (response.status === 201) {
        alert("User created successfully!"); // 성공하면 alert을 표시합니다
        window.location.href = "/login"; // alert 확인 후 로그인 페이지로 이동시킵니다
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="p-6 max-w-md w-full">
        <div className="justify-center items-center mb-4 place-items-center">
          <h2 className="mt-4 mb-5 text-center text-3xl font-extrabold text-gray-900">회원가입</h2>
  
          <hr className="mb-5"></hr>
        </div>
  
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <div className="relative">
            <input type="text" name="nickName" className="w-full h-14 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="닉네임" value={nickNameState} onChange={(e) => setNickNameState(e.target.value)} required />
            <button onClick={checkNickName} className="absolute right-2 top-2 px-2 py-2 border rounded-md hover:bg-pink-200 text-pink-700">Check</button>
          </div>
          
          <input type="text" name="userName" className="w-full h-14 item-center p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="사용자 이름" value={userNameState} onChange={(e) => setUserNameState(e.target.value)} required />
  
          <div className="relative">
            <input type="email" name="email" className="w-full h-14 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button onClick={() => handleEmailCheck(email)} className="absolute right-2 top-2 px-2 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">Check</button>
          </div>
          
          <input type="password" name="password" className="w-full h-14 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="패스워드" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" name="passwordConfirm" className="w-full h-14 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="비밀번호 확인" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
  
          <div>
            <label className="inline-flex items-center mt-5">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" value="allowExtraEmails" />
              <span className="ml-1 text-sm text-gray-700">광고/이벤트 정보 수신에 동의 하십니까?</span>
            </label>
          </div>
  
          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600">회원 가입</button>
        </form>
  
        <div className="mt-4 flex items-center justify-end">
          <a href="/login" className="font-medium text-sm text-pink-600 hover:text-pink-500">이미 회원이십니까? 로그인하러 가기</a>
        </div>
      </div>
  
      <div className="mt-6 text-center text-sm text-gray-500">
        Copyright © <a href="https://mui.com/" className="text-pink-600 hover:text-pink-500">Your Website</a> {new Date().getFullYear()}.
      </div>
    </div>
  );
  
}
