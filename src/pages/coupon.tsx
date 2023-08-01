import axios from "axios";
import { useState, useEffect } from "react";
const URL = "http://localhost:8080";

interface ICoupon {
  cpid: number;
  couponContent: string;
  code: string;
  discountType: string;
  discountValue: number;
  createdAt: Date;
  updatedAt: Date;
  endAt: Date;
}

const today = new Date();
const oneMonthLater = new Date(today);
oneMonthLater.setMonth(today.getMonth() + 1);

const Coupons = () => {
  const [couponCount, setCouponCount] = useState<number>(1); // 쿠폰 갯수를 관리할 state
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [coupon, setCoupon] = useState({
    couponContent: "",
    code: "",
    discountType: "PERCENT",
    discountValue: 0,
    createdAt: today,
    updatedAt: today,
    endAt: oneMonthLater,
  });
  console.log(coupons);
  console.log(today);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const couponNum = couponCount;

      const response = await axios.post(
        `${URL}/api/coupon?countNum=${couponNum}`,
        coupon
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
        const response = await axios.get<ICoupon[]>(`${URL}/api/coupon`);
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
            Coupon content:
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
            Discount Type:
            <select
              value={coupon.discountType}
              onChange={(e) =>
                setCoupon({ ...coupon, discountType: e.target.value })
              }
            >
              <option value="PERCENT">PERCENT</option>
              <option value="WON">WON</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Discount Percentage:
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
            Number of Coupons:
            <input
              type="number"
              placeholder="Number of Coupons"
              value={couponCount}
              onChange={(e) => setCouponCount(Number(e.target.value))}
            />
          </label>
        </div>
        <button type="submit">Create Coupon</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Content</th>
            <th>Code</th>
            <th>Discount</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>End At</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((item) => (
            <tr key={item.cpid}>
              <td>{item.cpid}</td>
              <td>{item.couponContent}</td>
              <td>{item.code}</td>
              {item.discountType === "PERCENT" ? (
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
};

export default Coupons;
