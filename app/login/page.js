"use client";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme } from "@mui/material/styles";
import { signIn } from "next-auth/react";
import Image from "next/image";

const defaultTheme = createTheme();
const CALLBACKURL = process.env.NEXT_PUBLIC_CALLBACKURL;
// const G_CALLBACKURL = process.env.NEXT_PUBLIC_GOOGlE_CALLBACKURL;

export default function SignInSide() {
  const handleLoginBtn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signIn("Credentials", {
      email: email,
      password: password,
      callbackUrl: CALLBACKURL,
    });
  };

  return (
    <div className="flex h-screen">
        <div className="w-4/12 bg-cover bg-center hidden sm:block" style={{ backgroundImage: "url(https://source.unsplash.com/random?wallpapers)" }}></div>
        <div className="w-full sm:w-8/12 bg-white p-8 flex flex-col justify-center">
            <div className="flex flex-col items-center">
                <LockOutlinedIcon />
                </div>
                <h1 className="text-2xl mt-3 text-center font-bold mb-5">로그인</h1>
                <form className="items-center px-10" onSubmit={handleLoginBtn}>
                    <input className="border w-full p-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500" type="email" name="email" placeholder="이메일" required />
                    <input className="border w-full p-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500" type="password" name="password" placeholder="비밀번호" required />
                    <div className="flex justify-between items-center mb-4">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox mr-2" />
                            아이디 저장
                        </label>
                    </div>
                    <button className="w-full bg-pink-500 text-white p-3 rounded-md mb-4">로그인</button>
                </form>
                <div className="mt-5 grid grid-cols-3 gap-3">
                    <button onClick={() => signIn("naver", { callbackUrl: CALLBACKURL })} className="flex justify-center items-center">
                        <Image src="/image/naver.png" alt="naverbtn" width={50} height={50} />
                    </button>
                    <button onClick={() => signIn("google", { callbackUrl: CALLBACKURL })} className="flex justify-center items-center">
                        <Image src="/image/google.png" alt="googlebtn" width={50} height={50} />
                    </button>
                    <button onClick={() => signIn("kakao", { callbackUrl: CALLBACKURL })} className="flex justify-center items-center">
                        <Image src="/image/kakao.png" alt="kakaobtn" width={50} height={50} />
                    </button>
                </div>
                <div className="mt-5 flex justify-end">
                    <a href="/signup" className="text-pink-500 text-sm px-10">회원가입</a>
                </div>
            </div>
        </div>
  );
}
