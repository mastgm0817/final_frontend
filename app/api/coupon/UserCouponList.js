import React, { useState, useEffect } from "react";
import axios from "axios";
import CouponInfo from "../../../components/coupon/CouponInfo";
import Slider from "react-slick";
import { useSession } from "next-auth/react"; // next-auth의 useSession을 import
const API_URL = process.env.NEXT_PUBLIC_URL;

const CouponApi = () => {
  const { data: session } = useSession(); // 세션 데이터 가져오기
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        try {
          const response = await axios.get(
            API_URL + `/users/info/${session.user.name}`
          );
          setUser(response.data);
        } catch (error) {
          console.error(error);
          alert("유저를 찾을 수 없습니다.");
        }
      }
    };

    fetchUser();
  }, [session]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h1 style={{ fontSize: "36px" }}>현재 로그인한 유저 쿠폰 리스트</h1>
      {user && (
        <div>
          <p>닉네임: {user.nickName}</p>
          <p>이메일: {user.email}</p>
          <p>역할: {user.userRole}</p>
          <p>쿠폰 리스트:</p>
          <p style={{ fontSize: "28px" }}>
            사용 가능한 쿠폰 총 개수: {user.couponList.length}
          </p>
          <Slider {...settings}>
            {user.couponList.map((coupon, index) => (
              <CouponInfo
                key={index}
                code={coupon.code}
                content={coupon.couponContent}
                discountType={coupon.discountType}
                discountValue={coupon.discountValue}
                assignedAt={coupon.assignedAt}
                endAt={coupon.endAt}
              />
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default CouponApi;
