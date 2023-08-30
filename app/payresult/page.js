"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyComponent = () => {
  const [kakaoApprove, setKakaoApprove] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8082/success?pg_token=someToken")
      .then((response) => {
        setKakaoApprove(response.data.kakaoApprove);
        setRedirectUrl(response.data.redirectUrl);

        // 리다이렉트 또는 다른 로직 처리...
      });
  }, []);

  return (
    <div>
      {kakaoApprove ? (
        <div>
          <h1>결제 정보</h1>
          {/* kakaoApprove가 객체라면 필드에 따라 렌더링 */}
          <p>결제 ID: {kakaoApprove.id}</p>
          <p>결제 금액: {kakaoApprove.amount}</p>
          {/* ... */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* 리다이렉트 버튼 또는 링크 */}
      {redirectUrl && <a href={redirectUrl}>리다이렉트하기</a>}
    </div>
  );
};

export default MyComponent;
