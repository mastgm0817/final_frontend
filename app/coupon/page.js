"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const today = new Date();
const oneMonthLater = new Date(today);
const API_URL = process.env.NEXT_PUBLIC_URL;
// const API_URL = "http://luvoost.co.kr";
// const API_URL = "http://localhost:8082";
oneMonthLater.setMonth(today.getMonth() + 1);
export default function Coupon() {
  const session = useSession();
  if (session) {
    console.log(session);
  } else {
    console.log("xx");
  }
  const [couponCount, setCouponCount] = useState(1); // 쿠폰 갯수를 관리할 state
  const [coupons, setCoupons] = useState([]);
  const [coupon, setCoupon] = useState({
    couponContent: "",
    code: "",
    discountType: "PERCENTAGE",
    discountValue: 0,
    createdAt: today,
    updatedAt: today,
    endAt: oneMonthLater,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        const response = await axios.get(API_URL + `/coupon`);
        setCoupons(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <div>
      <h1>Coupons</h1>
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
              <option value="PERCENTAGE">PERCENT</option>
              <option value="AMOUNT">WON</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            할인율?률? :
            <input
              type="number"
              placeholder="DiscountPercentage"
              value={coupon.discountValue}
              onChange={(e) =>
                setCoupon({ ...coupon, discountValue: Number(e.target.value) })
              }
            />
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
