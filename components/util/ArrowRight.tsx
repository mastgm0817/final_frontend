import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../public/animations/arrowRight.json";
export default function ArrowRight() {
  return (
    
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ width: 35, height: 35 }}
    />
  );
}
