import React, { useState } from "react";
import axios from "axios";
import CouponInfo from "../../../components/coupon/CouponInfo";
import Slider from "react-slick";
const API_URL = process.env.NEXT_PUBLIC_URL;

const CouponApi = ({}) => {
  const [userNickName, setUserNickName] = useState("");
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(API_URL + `/users/info/${userNickName}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
      alert("유저를 찾을 수 없습니다.");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h1 style={{ fontSize: "36px" }}>유저 검색하기</h1>
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
          <p>쿠폰 리스트:</p>
          <Slider {...settings}>
            {user.couponList.map((coupon, index) => (
              <CouponInfo
                key={index}
                code={coupon.code}
                content={coupon.couponContent}
                discountValue={coupon.discountValue}
                assignedAt={coupon.assignedAt}
                endAt={coupon.endAt}
                hideImageOnProfile={hideImageOnProfile}
              />
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default CouponApi;
