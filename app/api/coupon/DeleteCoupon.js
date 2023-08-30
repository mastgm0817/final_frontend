import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_URL;

export default function DeleteCoupon({ cpid,onSuccess }) {
  const { data: session } = useSession();

  const deleteCoupon = async () => {
    if (!session) {
      alert("세션이 유효하지 않습니다.");
      return;
    }

    const authToken = session.user.id; // 이 값을 실제 JWT 토큰과 맞춰주세요

    try {
      const response = await axios.post(
        `${API_URL}/coupon/${cpid}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert("쿠폰이 삭제되었습니다.");
        onSuccess();
      }
    } catch (error) {
      console.error("Error deleting coupon", error);
      alert("쿠폰 삭제에 실패했습니다.");
    }
  };

  return (
    <div>
      <button  className="hover:underline focus:outline-none text-sm text-red-500" onClick={deleteCoupon}>쿠폰 삭제</button>
    </div>
  );
}
