// components/RecommendResult.tsx
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
      <h1>Recommendation Results</h1>
      <div className="flex w-full h-500px" style={{ width: "100%" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black" }}>Restaurant Name</th>
              <th style={{ border: "1px solid black" }}>Address</th>
              <th style={{ border: "1px solid black" }}>Cuisine</th>
              <th style={{ border: "1px solid black" }}>Taste</th>
              <th style={{ border: "1px solid black" }}>Service</th>
              <th style={{ border: "1px solid black" }}>Ambiance</th>
              <th style={{ border: "1px solid black" }}>Kindness</th>
              <th style={{ border: "1px solid black" }}>Price</th>{" "}
              {/* 추가된 부분 */}
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black" }}>
                  {result.restaurant_prediction[0].사업장명}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {result.restaurant_prediction[0].소재지전체주소}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {result.restaurant_prediction[0].업태구분명}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {result.restaurant_prediction[0].맛}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {result.restaurant_prediction[0].서비스}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {result.restaurant_prediction[0].분위기}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {result.restaurant_prediction[0].친절도}
                </td>
                <td style={{ border: "1px solid black" }}>
                  {result.restaurant_prediction[0].price}
                </td>{" "}
                {/* 추가된 부분 */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecommendResult;
