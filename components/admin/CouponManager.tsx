import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useCallback } from "react";
import DeleteCoupon from "../../app/api/coupon/DeleteCoupon";

const today = new Date();
const oneMonthLater = new Date(today);
const API_URL = process.env.NEXT_PUBLIC_URL;
oneMonthLater.setMonth(today.getMonth() + 1);

interface CouponData {
  couponContent: string;
  code: string;
  discountType: "PERCENTAGE" | "AMOUNT";
  discountValue: number;
  createdAt: Date;
  updatedAt: Date;
  endAt: Date;
}
interface Coupon {
  cpid: number;
  userId: string | null;
  userName: string | null;
  code: string;
  couponContent: string;
  discountType: "PERCENTAGE" | "AMOUNT";
  discountValue: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  endAt: Date;
  assignedAt: Date | null;
}

export default function CouponManager() {
  const session = useSession();
  const [nickNames, setNickNames] = useState<any>({});
  const [discountOptions, setDiscountOptions] = useState<number[]>([]);
  const [couponCount, setCouponCount] = useState<number>(1);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [coupon, setCoupon] = useState<CouponData>({
    couponContent: "",
    code: "",
    discountType: "PERCENTAGE",
    discountValue: 0,
    createdAt: today,
    updatedAt: today,
    endAt: oneMonthLater,
  });
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const groupedCoupons: { [content: string]: Coupon[] } = coupons.reduce(
    (grouped, coupon) => {
      if (!grouped[coupon.couponContent]) {
        grouped[coupon.couponContent] = [];
      }
      grouped[coupon.couponContent].push(coupon);
      return grouped;
    },
    {}
  );

  const assignCoupon = async (cpId: any, nickName: any) => {
    // your API might require the nickName, not userId
    // replace userId with nickName in the request if needed
    const authToken = session.data?.user.id;
    const response = await fetch(
      `${API_URL}/coupon/assign?couponId=${cpId}&nickName=${nickName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (response.status == 200) {
      fetchCoupons();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const couponNum = couponCount;
      const authToken = session.data?.user.id;
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
      setCoupons([...coupons, ...response.data]);
      alert("Coupon Created Successfully");
    } catch (error) {
      console.error("Error creating coupon:", error);
      alert("Error creating coupon");
    }
  };

  const fetchCoupons = useCallback(async () => {
    try {
      const authToken = session.data?.user.id;
      const response = await axios.get(API_URL + `/coupon`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  }, [session?.data?.user?.id]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  useEffect(() => {
    if (coupon.discountType === "PERCENTAGE") {
      setDiscountOptions([10, 15]); // 예시입니다. 원하는 퍼센트로 변경 가능합니다.
    } else {
      setDiscountOptions([10000, 20000]); // 예시입니다. 원하는 금액으로 변경 가능합니다.
    }
  }, [coupon.discountType]);

  const handleChangeDiscountValue = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newDiscountValue = Number(e.target.value);
    setCoupon({ ...coupon, discountValue: newDiscountValue });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Coupons 생성</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            쿠폰 종류
          </label>
          <textarea
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-opacity-50"
            placeholder="Enter coupon content here..."
            value={coupon.couponContent}
            onChange={(e) =>
              setCoupon({ ...coupon, couponContent: e.target.value })
            }
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            할인 종류?
          </label>
          <select
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-opacity-50"
            value={coupon.discountType}
            onChange={(e) =>
              setCoupon({
                ...coupon,
                discountType: e.target.value as "PERCENTAGE" | "AMOUNT",
              })
            }
          >
            <option value="PERCENTAGE">PERCENTAGE</option>
            <option value="AMOUNT">AMOUNT</option>
          </select>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            할인율:{" "}
          </label>
          <select
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-opacity-50"
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
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            쿠폰 갯수
          </label>
          <input
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-opacity-50"
            type="number"
            placeholder="Number of Coupons"
            value={couponCount}
            onChange={(e) => setCouponCount(Number(e.target.value))}
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            쿠폰 생성
          </button>
        </div>
      </form>
      <div className="mt-6 border-t pt-4 w-full">
        <h2 className="text-lg font-medium mb-2">쿠폰 정보</h2>
        {Object.entries(groupedCoupons).map(([content, coupons]) => (
          <div
            key={content}
            className={`coupon-group mt-6 border-t pt-4 ${
              expandedGroup === content ? "open" : ""
            }`}
          >
            <strong
              className="text-xl mb-2 block cursor-pointer"
              onClick={() => {
                setExpandedGroup(expandedGroup === content ? null : content);
              }}
            >
              {content}
            </strong>
            {expandedGroup === content && (
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-1 text-gray-600">타입</div>
                <div className="col-span-1 text-gray-600">쿠폰번호</div>
                <div className="col-span-1 text-gray-600">소유자</div>
                <div className="col-span-1 text-gray-600">생성/만료일</div>
                <div className="col-span-1 text-gray-600">할당</div>
              </div>
            )}
            {expandedGroup === content &&
              coupons.map((item) => (
                <div
                  key={item.cpid}
                  className="coupon-details grid grid-cols-5 gap-4 mt-2"
                >
                  <div className="col-span-1">{item.discountType}</div>
                  <div className="col-span-1">{item.code}</div>
                  <div className="col-span-1">{item.userName}</div>
                  <div className="col-span-1">
                    <div className="text-gray-800">
                      생성일: {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-gray-800">
                      수정일: {new Date(item.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="text-gray-800">
                      만료일: {new Date(item.endAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="col-span-1">
                    {item.userName ? (
                      // If userName exists, show nothing in the assign column.
                      <></>
                    ) : (
                      <>
                        <input
                          type="text"
                          className="w-20"
                          placeholder="nickName"
                          value={nickNames[item.cpid] || ""}
                          onChange={(e) =>
                            setNickNames({
                              ...nickNames,
                              [item.cpid]: e.target.value,
                            })
                          }
                        />
                        <button
                          className="hover:underline focus:outline-none text-m text-blue-500"
                          onClick={() =>
                            assignCoupon(item.cpid, nickNames[item.cpid])
                          }
                        >
                          할당하기
                        </button>
                      </>
                    )}
                    <DeleteCoupon cpid={item.cpid} onSuccess={fetchCoupons} />
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
