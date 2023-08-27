"use client";
import Lottie from "react-lottie-player";
// import lottieJson from "../../public/animations/main.json";
import Image from "next/image";
import Link from "next/link";
import "./../../public/css/banner.css";

export default function Banner({
}) {

  return (
    <div
      className="flex items-center"
      style={{ fontFamily: "Chosunilbo_myungjo" }}
    >
      <Image src="/image/main.gif" alt="mainBanner" width={300} height={280}/>
      {/* <Lottie animationData={lottieJson} play={play} style={animationStyle} /> */}
      <div className="ml-10 slide-in-right">
        <p className="text-3xl font-bold leading-tight">
          데이트 코스 걱정 끝
          <br />내 연인과의 추억을 쌓는 곳
        </p>
        <div className="mt-2">
          <Link
            className="flex items-center space-x-2"
            href="/dateplan"
            passHref
          >
            <span className="animate-arrow">코스 추천 받으러 가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
