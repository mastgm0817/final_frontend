"use client"
import React from "react";
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'
import Lottie from "react-lottie-player";
import lottieJson from "./../public/animations/lover.json";
export default function LoverMatching() {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: 150, height: 150 }}
    />
  );
}
