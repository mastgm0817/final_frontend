"use client";
import { usePathname, useRouter } from "next/navigation";
import { Container, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import PaymentCouponList from "../api/coupon/PaymentCouponList";
import { useSession } from "next-auth/react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_URL;

export default function Payment() {
  const pathname = usePathname();
  const router = useRouter();

  const [params, setParams] = useState({
    title: "",
    price: "",
    description: "",
  });
  //   쿠폰적용코드 관련
  const [couponCode, setCouponCode] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const { data: session } = useSession();

  const applyCoupon = async () => {
    const authToken = session.user.id;
    console.log(couponCode);
    try {
      const response = await axios.post(
        API_URL + "/coupon/use",
        JSON.stringify(couponCode), // JSON 형태로 변환
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.status === "ok") {
        alert("쿠폰이 적용되었습니다.");
        const { discountType, discountValue } = response.data;

        // 적용된 쿠폰에 따라 가격 변경 로직
        let updatedPrice;
        if (discountType === "PERCENTAGE") {
          updatedPrice = totalPrice - (totalPrice * discountValue) / 100;
        } else if (discountType === "AMOUNT") {
          updatedPrice = totalPrice - discountValue;
        }
        setTotalPrice(updatedPrice);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // 서버에서 보내는 커스터마이징된 에러 메시지
        alert(error.response.data.message);
      } else {
        alert("쿠폰 적용 중 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const title = urlParams.get("title");
      const price = urlParams.get("price");
      const description = urlParams.get("description");

      setParams({
        title: decodeURIComponent(title || ""),
        price: decodeURIComponent(price || ""),
        description: decodeURIComponent(description || "[]"),
      });

      // 쉼표 제거
      const sanitizedPrice = price ? price.replace(/,/g, "") : "";

      if (sanitizedPrice && !isNaN(Number(sanitizedPrice))) {
        setTotalPrice(Number(sanitizedPrice));
      }
    }
  }, []);

  useEffect(() => {
    // 2분 후에 실행될 함수
    const timer = setTimeout(() => {
      // 페이지 리로드
      window.location.reload();
    }, 4 * 60 * 1000); // 5분이상 페이지에 머물시 리로드 (예약쿠폰 중복 막기위함 쿠폰은 5분 셋팅)

    // 컴포넌트 언마운트 시 타이머 제거
    return () => clearTimeout(timer);
  }, []);

  const { title, price, description } = params;
  const parsedDescription = description ? JSON.parse(description) : [];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        결제 페이지
      </Typography>
      <Typography variant="h5">상품: {title}</Typography>
      <Typography variant="h6">가격: {price || "Loading..."}</Typography>

      <PaymentCouponList></PaymentCouponList>
      <Typography>상품 설명:</Typography>
      <ul>
        {parsedDescription &&
          Array.isArray(parsedDescription) &&
          parsedDescription.map((desc, index) => <li key={index}>{desc}</li>)}
      </ul>

      <TextField
        label="쿠폰 코드"
        variant="outlined"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={applyCoupon}>
        쿠폰 적용하기
      </Button>
      <Typography variant="h6">
        총 금액: {totalPrice.toLocaleString()}
      </Typography>

      <Button variant="contained" color="primary">
        결제하기
      </Button>
    </Container>
  );
}
