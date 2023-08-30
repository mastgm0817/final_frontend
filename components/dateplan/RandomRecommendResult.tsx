import React from "react";

interface RandomRecommendResultProps {
  results: any[];
}

const RandomRecommendResult: React.FC<RandomRecommendResultProps> = ({
  results,
}) => {
  if (!results || results.length === 0) {
    return (
      <div className="text-center text-gray-600 my-8">
        코스 추천 결과가 없습니다. 다시 시도해 주세요!
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="grid gap-6">
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr>
              <th>상호명</th>
              <th>주소</th>
              <th>구분</th>
              <th>맛</th>
              <th>서비스</th>
              <th>분위기</th>
              <th>친절도</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(results) ? (
              results.map((result, index) => (
                <React.Fragment key={index}>
                  {[0, 1, 2, 3, 4,5,6,7,8,9].map((restaurantIndex) => (
                    <tr key={restaurantIndex}>
                      <td>
                        {result.random[restaurantIndex].사업장명}
                      </td>
                      <td>
                        {
                          result.random[restaurantIndex]
                            .소재지전체주소
                        }
                      </td>
                      <td>
                        {
                          result.random[restaurantIndex]
                            .업태구분명
                        }
                      </td>
                      <td>
                        {result.random[restaurantIndex].맛}
                      </td>
                      <td>
                        {result.random[restaurantIndex].서비스}
                      </td>
                      <td>
                        {result.random[restaurantIndex].분위기}
                      </td>
                      <td>
                        {result.random[restaurantIndex].친절도}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={9}>No results available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RandomRecommendResult;
