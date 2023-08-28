import React from "react";

interface RecommendResultProps {
  results: any[]; // 결과 배열
}

const RecommendResult: React.FC<RecommendResultProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return <div>코스 추천 결과가 없습니다. 다시 시도해 주세요 !</div>;
  }

  return (
    <div>
      <h1 style={{ color: "#f783ac", marginBottom: "20px" }}>
        코스 추천 결과
      </h1>
      <div className="flex w-full">
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
              <th style={tableCellStyle}>상호명</th>
              <th style={tableCellStyle}>주소</th>
              <th style={tableCellStyle}>구분</th>
              <th style={tableCellStyle}>맛</th>
              <th style={tableCellStyle}>서비스</th>
              <th style={tableCellStyle}>분위기</th>
              <th style={tableCellStyle}>친절도</th>
              <th style={tableCellStyle}>가격</th>
              <th style={tableCellStyle}>예산</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(results) ? (
              results.map((result, index) => (
                <React.Fragment key={index}>
                  {[0, 1, 2, 3, 4].map((restaurantIndex) => (
                    <tr key={restaurantIndex}>
                      <td style={tableCellStyle}>
                        {result.restaurant_prediction[restaurantIndex].사업장명}
                      </td>
                      <td style={tableCellStyle}>
                        {result.restaurant_prediction[restaurantIndex].소재지전체주소}
                      </td>
                      <td style={tableCellStyle}>
                        {result.restaurant_prediction[restaurantIndex].업태구분명}
                      </td>
                      <td style={tableCellStyle}>
                        {result.restaurant_prediction[restaurantIndex].맛}
                      </td>
                      <td style={tableCellStyle}>
                        {result.restaurant_prediction[restaurantIndex].서비스}
                      </td>
                      <td style={tableCellStyle}>
                        {result.restaurant_prediction[restaurantIndex].분위기}
                      </td>
                      <td style={tableCellStyle}>
                        {result.restaurant_prediction[restaurantIndex].친절도}
                      </td>
                      <td style={tableCellStyle}>
                        {result.restaurant_prediction[restaurantIndex].mean_price}원
                      </td>
                      <td style={tableCellStyle}>
                        {result.expected_total_cost}원
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


const tableCellStyle = {
  border: "1px solid black",
  padding: "8px",
};

export default RecommendResult;