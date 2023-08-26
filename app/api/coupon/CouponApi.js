import React, { useState } from "react";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_URL;

const CouponApi = () => {
  const [userNickName, setUserNickName] = useState("");
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(API_URL + `/users/info/${userNickName}`);
      console.log(response);
      setUser(response.data);
    } catch (error) {
      console.error(error);
      alert("유저를 찾을 수 없습니다.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={userNickName}
        onChange={(e) => setUserNickName(e.target.value)}
        placeholder="유저 아이디를 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>
      {user && (
        <div>
          <p>닉네임: {user.nickName}</p>
          <p>이메일: {user.email}</p>
          <p>역할: {user.userRole}</p>
          <p>쿠폰 리스트: {user.couponList.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default CouponApi;
