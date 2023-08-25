"use client";
import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../public/animations/main.json";
import ArrowRight from "./ArrowRight";
import Link from "next/link";
import "./../../public/css/banner.css";
import Image from "next/image";

export default function Banner({
}) {
  // hover와 관련된 상태 및 함수 삭제
  // const [isHovered, setIsHovered] = useState(false);

  // const handleHover = () => {
  //     setIsHovered(true);
  // };

  // const handleLeave = () => {
  //     setIsHovered(false);
  // };

  // const animationStyle = {
  //   ...style,
  //   transition: "width 0.3s, height 0.3s",
  //   // hover와 관련된 스타일 수정 삭제
  //   // width: isHovered ? style.width * 1.2 : style.width,
  //   // height: isHovered ? style.height * 1.2 : style.height,
  // };

  return (
    <div
      className="flex items-center"
      // onMouseEnter와 onMouseLeave 핸들러 삭제
      // onMouseEnter={handleHover}
      // onMouseLeave={handleLeave}
      style={{ fontFamily: "Chosunilbo_myungjo" }}
    >
      <Image src="/image/main.gif" alt="mainBanner" width={400} height={380} />
      {/* <Lottie animationData={lottieJson}/> */}
      <div className="ml-4 slide-in-right">
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
            {/* <ArrowRight /> */}
          </Link>
        </div>
      </div>
    </div>
  );
}
