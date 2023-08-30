import React, { useState, useEffect } from "react";
import axios from "axios";
import CouponInfo from "../../../components/coupon/CouponInfo";
import Slider from "react-slick";
import { useSession } from "next-auth/react"; // next-auth의 useSession을 import
const API_URL = process.env.NEXT_PUBLIC_URL;
import "./../../../public/css/coupon.css";
import Skeleton from "./../../../components/coupon/Skeleton";

const CouponApi = ({hideImageOnProfile}) => {
  const { data: session } = useSession(); // 세션 데이터 가져오기
  const [user, setUser] = useState(null);
  const [discountType, setDiscountType] = useState(null);
  const [discountValue, setDiscountValue] = useState(null);
  const [isLoadingCoupon, setIsLoadingCoupon] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        setIsLoadingCoupon(true);
        try {
          const response = await axios.get(
            API_URL + `/users/info/${session.user.name}`
          );
          setUser(response.data);
          setIsLoadingCoupon(false);
        } catch (error) {
          console.error(error);
          setIsLoadingCoupon(false);
          alert("유저를 찾을 수 없습니다.");
        }
      }
    };

    fetchUser();
  }, [session]);


 
  
  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <div>
      {user && (
        <div>
          <div className="font-bold mb-3">
            사용 가능한 쿠폰 총 개수: {user.couponList.length}
          </div>

          {isLoadingCoupon && <Skeleton />}
          {!isLoadingCoupon && 
          <>
            
            <Slider {...settings}>
            {user.couponList.map((coupon) => (
              <div key={coupon.id} className="ml-0">
                <CouponInfo
                  key={coupon.id}
                  code={coupon.code}
                  content={coupon.couponContent}
                  discountType={coupon.discountType}
                  discountValue={coupon.discountValue}
                  assignedAt={coupon.assignedAt}
                  endAt={coupon.endAt}
                  hideImageOnProfile={hideImageOnProfile}
                />
              </div>
            ))}
          </Slider>
          </>
          }<br/>
        </div>
      )}
    </div>
  );
};

export default CouponApi;
