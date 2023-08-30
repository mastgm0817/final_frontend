"use client";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import "./../../public/css/fonts.css";
import "./../../public/css/coupon.css";

const tiers = [
  {
    title: "일주일 이용권",
    price: "3,300",
    description: [
      "데이트 코스 추천 무제한",
      "일단 사봐",
      "좋을껄?",
      "계속 서비스 추가될거야",
    ],
    buttonText: "구매하기",
    buttonVariant: "bg-rose-500",
    backgroundC:"rose-400",
  },
  {
    title: "한달 이용권",
    price: "9,900",
    description: [
      "데이트 코스 추천 무제한",
      "이정도론 호구아님 사봐",
      "아마 좋을껄?",
      "계속 서비스 추가될거야",
    ],
    buttonText: "구매하기",
    buttonVariant: "bg-rose-600",
    backgroundC:"rose-500",
  },
  {
    title: "일년 이용권",
    price: "55,000",
    description: [
      "데이트 코스 추천 무제한",
      "일단 사봐(호구아님)",
      "후후후후 제발",
      "계속 서비스 추가될거야",
    ],
    buttonText: "구매하기",
    buttonVariant: "bg-rose-700",
    backgroundC:"rose-600"
  },
];


export default function Pricing() {
  const pathname = usePathname();
  const router = useRouter();

  const goToPaymentPage = (selectedTier) => {
    const title = encodeURIComponent(selectedTier.title);
    const price = encodeURIComponent(selectedTier.price);
    const description = encodeURIComponent(
      JSON.stringify(selectedTier.description)
    );

    router.push(
      `/payment?title=${title}&price=${price}&description=${description}`
    );
  };

  return (
    <div className="container mx-auto px-4">

      <br/><br/>
      <div className="text-left my-8">
        <h1 className="text-4xl font-bold">VIP 정기권 구매</h1>
      </div>
      <span><hr/></span><br/>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {tiers.map((tier) => (
          <div key={tier.title} className="rounded-lg overflow-hidden bg-gray-50 transform transition-transform duration-300 hover:scale-105">
            <div className={`px-6 py-4 bg-${tier.backgroundC}`}>
              <div className="font-extrabold text-2xl text-white text-center my-5 mb-7">{tier.title}</div> 
            
            <div className="bg-white border rounded-lg">
            <div className="px-6 py-4">
              <div className="font-extrabold text-4xl m-4 mb-7 text-center">{tier.price}<span className="text-lg ml-2">원</span></div>
              <hr /><br />
              <ul className="list-disc pl-5">
                {tier.description.map((line) => (
                  <li key={line} className="mb-2">{line}</li>
                ))}
              </ul>
            </div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button
                className={`w-full py-2 px-3 text-lg font-bold text-rose-700  text-white rounded-lg border-${tier.buttonVariant} bg-${tier.backgroundC} hover:${tier.buttonVariant}`}
                onClick={() => goToPaymentPage(tier)}
              >
                {tier.buttonText}
              </button>
              
            </div>
            </div>
          </div>
        ))}
      
      </div>

      <div className="container mx-auto px-4">
        <br /><br /><br />
        <div className="font-bold my-2">이용권 구매 시 유의사항</div>

        <div className="ml-2 mb-20">
          <ol>
            <li>1주 이용권은 결제일로부터 1주일의 사용 기간을 기준으로 하는 1주 단위 상품으로, 구매 시간으로부터 1주일 경과 시 자동 소멸됩니다.</li>
            <li>1개월 이용권은 결제일로부터 1개월의 사용 기간을 기준으로 하는 1개월 단위 상품으로, 구매 시간으로부터 1개월 경과 시 자동 소멸됩니다.</li>
            <li>1년 이용권은 결제일로부터 1년의 사용기간을 기준으로 하는 1개월 단위 상품으로, 구매 시간으로부터 1년 경과 시 자동 소멸됩니다.</li>
            <li>이용 기간 만료 후에 자동 연장되지 않으며, 추가 이용을 원하실 경우 재결제가 필요합니다.</li>
            <li>결제 시 별도의 부가세를 부과하지 않습니다.</li>
            <li>그 외 이용권 구매 관련 문의사항은 상단의 INQUIRY를 통해 문의해주세요.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

