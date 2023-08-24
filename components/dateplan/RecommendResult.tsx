import React from "react";

interface RecommendResultProps {
  results: any[]; // 결과 배열
}

const RecommendResult: React.FC<RecommendResultProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return <div>No results available.</div>;
  }

  return (
    <div>
      <h1 style={{ color: "#f783ac", marginBottom: "20px" }}>
        Recommendation Results
      </h1>
      <div className="flex w-full">
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // 그림자 추가
            borderRadius: "8px", // 테이블 모서리 둥글게
            overflow: "hidden", // 테이블의 내용이 넘칠 때 가려지도록
          }}
        >
          <thead>
            <tr>
              {/* 각 셀의 스타일 적용 */}
              <th style={tableCellStyle}>식당 이름</th>
              <th style={tableCellStyle}>식당 주소</th>
              <th style={tableCellStyle}>구분</th>
              <th style={tableCellStyle}>맛</th>
              <th style={tableCellStyle}>서비스</th>
              <th style={tableCellStyle}>분위기</th>
              <th style={tableCellStyle}>친절도</th>
              <th style={tableCellStyle}>가격</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(results) ? (
    results.map((result, index) => (
      <tr key={index}>
        <td style={{ border: "1px solid black" }}>
          {result.restaurant_prediction[0].사업장명}
        </td>
                <td style={tableCellStyle}>
                  {result.restaurant_prediction[0].소재지전체주소}
                </td>
                <td style={tableCellStyle}>
                  {result.restaurant_prediction[0].업태구분명}
                </td>
                <td style={tableCellStyle}>
                  {result.restaurant_prediction[0].맛}
                </td>
                <td style={tableCellStyle}>
                  {result.restaurant_prediction[0].서비스}
                </td>
                <td style={tableCellStyle}>
                  {result.restaurant_prediction[0].분위기}
                </td>
                <td style={tableCellStyle}>
                  {result.restaurant_prediction[0].친절도}
                </td>
                <td style={tableCellStyle}>
                  {result.restaurant_prediction[0].price}
                </td>
              </tr>
             ))
             ) : (
               <tr>
                 <td colSpan={3}>No results available</td>
               </tr>
             )}
           </tbody>
        </table>
      </div>
    </div>
  );
};

// 각 셀의 스타일을 객체로 정의
const tableCellStyle = {
  border: "1px solid black",
  padding: "8px",
};

export default RecommendResult;
