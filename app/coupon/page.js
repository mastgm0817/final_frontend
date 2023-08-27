"use client";
import React from "react";
import axios from "axios";
import CouponApi from "../api/coupon/CouponApi";
import CouponFormApi from "../api/coupon/CouponFormApi";
import DeleteCoupon from "../api/coupon/DeleteCoupon";
import UserCouponList from "../api/coupon/UserCouponList";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const today = new Date();
const oneMonthLater = new Date(today);
const API_URL = process.env.NEXT_PUBLIC_URL;
oneMonthLater.setMonth(today.getMonth() + 1);
export default function Coupon() {
  const session = useSession();
  if (session) {
    console.log(session);
  } else {
    console.log("세션없음");
  }
  const [discountOptions, setDiscountOptions] = useState([]);
  const [couponCount, setCouponCount] = useState(1); // 쿠폰 갯수를 관리할 state
  const [coupons, setCoupons] = useState([]);
  const [coupon, setCoupon] = useState({
    couponContent: "",
    code: "",
    discountType: "PERCENTAGE",
    discountValue: 10,
    createdAt: today,
    updatedAt: today,
    endAt: oneMonthLater,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting with coupon object: ", coupon); // 1번 디버깅 코드

    try {
      const couponNum = couponCount;
      const authToken = session.data.user.id;
      console.log(authToken);

      const response = await axios.post(
        API_URL + `/coupon?countNum=${couponNum}`,
        coupon,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // 토큰을 헤더에 추가
          },
        }
      );
      console.log("Coupon created:", response.data);
      setCoupons([...coupons, ...response.data]);
      alert("Coupon Created Successfully");
    } catch (error) {
      console.error("Error creating coupon:", error);
      alert("Error creating coupon");
    }
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const authToken = session.data.user.id;
        const response = await axios.get(API_URL + `/coupon`, {
          headers: {
            Authorization: `Bearer ${authToken}`, // 토큰을 헤더에 추가
          },
        });
        console.log(response.data);
        setCoupons(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, [session?.data?.user?.id]);

  useEffect(() => {
    if (coupon.discountType === "PERCENTAGE") {
      setDiscountOptions([10, 15]); // 예시입니다. 원하는 퍼센트로 변경 가능합니다.
    } else {
      setDiscountOptions([10000, 20000]); // 예시입니다. 원하는 금액으로 변경 가능합니다.
    }
  }, [coupon.discountType]);

  const handleChangeDiscountValue = (e) => {
    const newDiscountValue = Number(e.target.value);
    console.log("Setting discountValue to: ", newDiscountValue); // 2번 디버깅 코드
    setCoupon({ ...coupon, discountValue: newDiscountValue });
  };

  return (
    <div>
      <h1 style={{ fontSize: "36px" }}>Coupons 생성</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            쿠폰 종류 :
            <textarea
              placeholder="Enter coupon content here..."
              value={coupon.couponContent}
              onChange={(e) =>
                setCoupon({ ...coupon, couponContent: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label>
            할인 종류? :
            <select
              value={coupon.discountType}
              onChange={(e) =>
                setCoupon({ ...coupon, discountType: e.target.value })
              }
            >
              <option value="PERCENTAGE">PERCENTAGE</option>
              <option value="AMOUNT">AMOUNT</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            할인율 :
            <select
              value={coupon.discountValue}
              onChange={handleChangeDiscountValue}
            >
              {discountOptions.map((option, index) => (
                <option key={index} value={option}>
                  {coupon.discountType === "PERCENTAGE"
                    ? `${option} %`
                    : `${option} 원`}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            쿠폰 번호 :
            <input
              type="number"
              placeholder="Number of Coupons"
              value={couponCount}
              onChange={(e) => setCouponCount(Number(e.target.value))}
            />
          </label>
        </div>
        <button type="submit">쿠폰 생성</button>
      </form>
      <h1 style={{ fontSize: "36px" }}> 쿠폰 삭제 </h1>
      <DeleteCoupon></DeleteCoupon>
      <h1 style={{ fontSize: "36px" }}> 생성된 쿠폰 리스트 정보 </h1>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>종류</th>
            <th>코드</th>
            <th>할인</th>
            <th>생성 날짜</th>
            <th>수정 날짜</th>
            <th>만료일</th>
            <th>쿠폰소유자</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((item) => (
            <tr key={item.cpid}>
              <td>{item.cpid}</td>
              <td>{item.couponContent}</td>
              <td>{item.code}</td>
              {item.discountType === "PERCENTAGE" ? (
                <td> {item.discountValue} % </td>
              ) : (
                <td> {item.discountValue} 원 </td>
              )}
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
              <td>{new Date(item.endAt).toLocaleDateString()}</td>
              <td>{item.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CouponApi></CouponApi>
      <CouponFormApi></CouponFormApi>
      <UserCouponList></UserCouponList>
    </div>
  );
}
