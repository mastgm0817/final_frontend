import * as React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Image from "next/image";

export default function CouponInfo({
  code,
  content,
  discountValue,
  discountType,
  assignedAt,
  endAt,
}) {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(
      () => {
        alert("쿠폰 번호가 클립보드에 복사되었습니다.");
      },
      (err) => {
        alert("쿠폰 번호를 복사하는데 실패했습니다.", err);
      }
    );
  };
  let imageSrc;
  if (content === "회원가입축하쿠폰") {
    imageSrc = "./image/cImgSignup.png";
  } else if (discountType === "PERCENTAGE") {
    imageSrc = `./image/${discountValue}per.png`;
  } else {
    imageSrc = `./image/${discountValue}.png`;
  }
  return (
    <div className="max-w-xs rounded overflow-hidden">
      <div className="relative w-full h-auto">
        <Image
          src={imageSrc}
          alt="CouponImage"
          width={400}
          height={200}
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <a
          href="#product-card"
          className="text-lg font-medium text-rose-500 hover:underline flex items-center"
        >
          {content}
          <ArrowOutwardIcon className="ml-1" />
        </a>

        <h3 className="text-xl font-bold mt-2 flex items-center">
          {code}
          <span className="ml-2 px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-sm">
            {discountValue}%
          </span>
        </h3>
        <p className="text-xs mt-1">할당 일자: {assignedAt}</p>
        <p className="text-xs">만료 일자: {endAt}</p>

        <button
          onClick={handleCopyCode}
          className="mt-3 w-full bg-rose-400 text-white p-2 rounded"
        >
          쿠폰번호 복사하기
        </button>
      </div>
    </div>
  );
}
