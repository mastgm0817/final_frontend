import { useSession } from "next-auth/react";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_URL;

const CouponFormApi = () => {
  const [couponId, setCouponId] = useState("");
  const [userId, setUserId] = useState("");
  const session = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 쿠폰과 유저 아이디 할당
    await assignCoupon(couponId, userId);
  };

  const assignCoupon = async (couponId, userId) => {
    const authToken = session.data.user.id;
    const response = await fetch(
      `${API_URL}/coupon/assign?couponId=${couponId}&userId=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const data = await response.text();
    console.log(data);
    if (response.ok) {
      // 쿠폰 할당 성공
      alert("쿠폰이 성공적으로 할당되었습니다.");
    } else {
      // 실패 처리: 서버에서 반환한 에러 메시지를 사용
      //   alert("쿠폰 할당에 실패했습니다.");
      alert(data || "쿠폰 할당에 실패했습니다.");
    }
  };

  return (
    <>
      <h1 style={{ fontSize: "36px" }}>쿠폰 할당하기</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="couponId">쿠폰 번호: </label>
          <input
            type="text"
            id="couponId"
            value={couponId}
            onChange={(e) => setCouponId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userId">유저 번호: </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <button type="submit">쿠폰 할당</button>
      </form>
    </>
  );
};

export default CouponFormApi;
