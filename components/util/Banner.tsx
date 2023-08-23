"use client";
import React, { useState } from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../public/animations/main.json";
import ArrowRight from "./ArrowRight";
import Link from "next/link";

export default function Banner({
  play = true,
  style = { width: 450, height: 400 },
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const animationStyle = {
    ...style,
    transition: "width 0.3s, height 0.3s",
    width: isHovered ? style.width * 1.2 : style.width,
    height: isHovered ? style.height * 1.2 : style.height,
  };

  return (
    <div
      className="flex items-center"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <Lottie animationData={lottieJson} play={play} style={animationStyle} />
      <div className="ml-4">
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
            <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
