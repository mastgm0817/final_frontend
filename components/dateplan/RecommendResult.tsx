import React from "react";

interface RecommendResultProps {
  results: any[]; // 결과 배열
}

const RecommendResult: React.FC<RecommendResultProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return <div className="text-center text-gray-600 my-8">코스 추천 결과가 없습니다. 다시 시도해 주세요 !</div>;
  }

  return (
    <div className="text-center">
      <h1 className="text-xl font-bold text-pink-500 mb-6">데이트 추천 코스 결과</h1>
      <div className="flex flex-col gap-8">
        {results.map((result, courseIndex) => (
          <div key={courseIndex} className="bg-white rounded-lg shadow-md p-4">
            {/* <h2 className="text-lg font-semibold mb-2">코스 {courseIndex + 1}</h2> */}
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2">상호명</th>
                  <th className="p-2">주소</th>
                  <th className="p-2">구분</th>
                  <th className="p-2">맛</th>
                  <th className="p-2">서비스</th>
                  <th className="p-2">분위기</th>
                  <th className="p-2">친절도</th>
                  <th className="p-2">가격</th>
                  <th className="p-2">예산</th>
                </tr>
              </thead>
              <tbody>
                {result.restaurant_prediction && Array.isArray(result.restaurant_prediction) ? (
                  result.restaurant_prediction.map((restaurant: any, restaurantIndex: number) => (
                    <tr key={restaurantIndex}>
                      <td className="p-2">{restaurant.사업장명 || "-"}</td>
                      <td className="p-2">{restaurant.소재지전체주소 || "-"}</td>
                      <td className="p-2">{restaurant.업태구분명 || "-"}</td>
                      <td className="p-2">{restaurant.맛 || "-"}</td>
                      <td className="p-2">{restaurant.서비스 || "-"}</td>
                      <td className="p-2">{restaurant.분위기 || "-"}</td>
                      <td className="p-2">{restaurant.친절도 || "-"}</td>
                      <td className="p-2">{restaurant.max_price || "-"}원</td>
                      <td className="p-2">{result.expected_total_cost || "-"}원</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="p-2">No results available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendResult;